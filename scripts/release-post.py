#!/usr/bin/env python3
"""
Staggered blog release: publishes any scheduled post whose release_date is today
or earlier (UTC). Idempotent — running twice does nothing the second time.

What it does per due post:
  1. Removes `published: false` for that post id in js/site.js (reveals it in the
     home feed + blog listing).
  2. Sets the post's date fields to its release_date (site.js `date:` for all 3
     langs, plus datePublished/dateModified in the JSON-LD and the visible
     data-art-date in each language file).
  3. Re-inserts the 3 sitemap <url> blocks (de/en/zh) for that post.

It does NOT commit or push — the caller (cloud routine or you) does that, so the
diff can be reviewed. Prints a summary and exits 0 if it published something,
exits 3 (nothing due) so a routine can decide whether to skip the commit.

Usage:
  python3 scripts/release-post.py            # publish anything due as of today (UTC)
  python3 scripts/release-post.py --date 2026-07-23   # simulate a given day
  python3 scripts/release-post.py --dry-run  # show what would change, write nothing
"""
import json, re, sys, os, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHED = os.path.join(ROOT, "scripts", "blog-release-schedule.json")
SITEJS = os.path.join(ROOT, "js", "site.js")
SITEMAP = os.path.join(ROOT, "sitemap.xml")
BASE = "https://waiser.dev/blog/posts"

MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"]

def human_date(iso):  # 2026-07-23 -> "23 JUL 2026"
    y, m, d = iso.split("-")
    return f"{int(d):02d} {MONTHS[int(m)-1]} {y}"

def load_args():
    date = None; dry = False
    for a in sys.argv[1:]:
        if a == "--dry-run": dry = True
        elif a.startswith("--date"):
            date = a.split("=",1)[1] if "=" in a else sys.argv[sys.argv.index(a)+1]
    return date, dry

def today_utc():
    return datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d")

def reveal_in_sitejs(s, post_id, iso):
    """Remove `published: false` for this id and set date: to human_date in all langs of that block."""
    # Find the object block for this id: from `id: "<id>"` up to the closing `  },`
    m = re.search(r'(\{\s*\n\s*id:\s*"'+re.escape(post_id)+r'".*?\n  \})', s, re.S)
    if not m:
        return s, False
    block = m.group(1)
    new = block
    # drop the published:false line (with trailing comment + newline)
    new = re.sub(r'\n\s*published:\s*false,[^\n]*', '', new)
    # set every date: "...", within this block to the release human date
    new = re.sub(r'(date:\s*")[^"]*(")', lambda mm: mm.group(1)+human_date(iso)+mm.group(2), new)
    if new != block:
        s = s.replace(block, new)
        return s, True
    return s, False

def sitemap_block(fn_by_lang, iso):
    de, en, zh = fn_by_lang["de"], fn_by_lang["en"], fn_by_lang["zh"]
    alts = (
        f'    <xhtml:link rel="alternate" hreflang="de" href="{BASE}/de/{de}"/>\n'
        f'    <xhtml:link rel="alternate" hreflang="en" href="{BASE}/en/{en}"/>\n'
        f'    <xhtml:link rel="alternate" hreflang="zh" href="{BASE}/zh/{zh}"/>\n'
        f'    <xhtml:link rel="alternate" hreflang="x-default" href="{BASE}/de/{de}"/>\n'
    )
    out = ""
    for lang, fn in (("de", de), ("en", en), ("zh", zh)):
        out += (f'  <url>\n    <loc>{BASE}/{lang}/{fn}</loc>\n'
                f'    <lastmod>{iso}</lastmod>\n{alts}  </url>\n')
    return out

def set_article_dates(path, iso):
    """Set datePublished, dateModified in JSON-LD and the visible data-art-date."""
    if not os.path.exists(path): return False
    s = open(path, encoding="utf-8").read(); o = s
    s = re.sub(r'("datePublished":\s*")[^"]*(")', r'\g<1>'+iso+r'\g<2>', s)
    s = re.sub(r'("dateModified":\s*")[^"]*(")', r'\g<1>'+iso+r'\g<2>', s)
    s = re.sub(r'(<span data-art-date>)[^<]*(</span>)', r'\g<1>'+human_date(iso)+r'\g<2>', s)
    if s != o:
        open(path, "w", encoding="utf-8").write(s); return True
    return False

def main():
    target_date, dry = load_args()
    today = target_date or today_utc()
    sched = json.load(open(SCHED, encoding="utf-8"))
    due = [p for p in sched["posts"]
           if p.get("status") == "scheduled" and p["release_date"] <= today]
    if not due:
        print(f"[release] nothing due as of {today} (UTC).")
        sys.exit(3)

    sitejs = open(SITEJS, encoding="utf-8").read()
    sitemap = open(SITEMAP, encoding="utf-8").read()
    published = []

    for p in due:
        pid, iso = p["id"], p["release_date"]
        sitejs, _revealed = reveal_in_sitejs(sitejs, pid, iso)
        fn = {"de": os.path.basename(p["de_file"]),
              "en": os.path.basename(p["en_file"]),
              "zh": os.path.basename(p["zh_file"])}
        # sitemap: only add if not already present
        if f"/de/{fn['de']}" not in sitemap:
            sitemap = sitemap.replace("</urlset>", sitemap_block(fn, iso) + "</urlset>")
        # per-file date stamps
        for lf in ("de_file", "en_file", "zh_file"):
            set_article_dates(os.path.join(ROOT, p[lf]), iso) if not dry else None
        published.append((pid, iso))

    if dry:
        print(f"[release][dry-run] would publish: {', '.join(f'{i} ({d})' for i,d in published)}")
        sys.exit(0)

    open(SITEJS, "w", encoding="utf-8").write(sitejs)
    open(SITEMAP, "w", encoding="utf-8").write(sitemap)

    # mark released posts as published in the manifest so re-runs are no-ops
    pub_ids = {i for i, _ in published}
    for p in sched["posts"]:
        if p["id"] in pub_ids:
            p["status"] = "published"
    json.dump(sched, open(SCHED, "w", encoding="utf-8"), ensure_ascii=False, indent=2)
    open(SCHED, "a", encoding="utf-8").write("\n")

    print(f"[release] published: {', '.join(f'{i} ({d})' for i,d in published)}")
    print("[release] Remember to also update claude.compact.md / llms.txt if desired, then commit & push.")
    sys.exit(0)

if __name__ == "__main__":
    main()
