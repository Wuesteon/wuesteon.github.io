#!/usr/bin/env python3
"""Generate claude.compact.md — a compact index of all blog posts.

Scans blog/posts/de/*.html (DE = canonical), pulls title, meta description,
datePublished/dateModified from the JSON-LD, and notes which translations
exist. Output is sorted newest first.

Usage:  python3 scripts/build-compact.py
Run after adding or editing a blog post; commit the regenerated file.
Requires only the Python stdlib.
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
POSTS_DE = ROOT / "blog" / "posts" / "de"
BASE_URL = "https://waiser.dev"
OUTPUT = ROOT / "claude.compact.md"


def extract(html: str, path: Path) -> dict:
    """Pull metadata from one post's HTML."""
    meta = {"file": path.name}

    m = re.search(r"<title>(.*?)</title>", html, re.S)
    meta["title"] = m.group(1).strip() if m else path.stem

    m = re.search(r'<meta name="description" content="(.*?)"', html, re.S)
    meta["description"] = m.group(1).strip() if m else ""

    m = re.search(r'<link rel="canonical" href="(.*?)"', html)
    meta["url"] = m.group(1) if m else f"{BASE_URL}/blog/posts/de/{path.name}"

    # Dates + EN/ZH slug from JSON-LD / hreflang
    m = re.search(r'"datePublished":\s*"([\d-]+)"', html)
    meta["published"] = m.group(1) if m else "????-??-??"
    m = re.search(r'"dateModified":\s*"([\d-]+)"', html)
    meta["modified"] = m.group(1) if m else None

    m = re.search(r'hreflang="en" href=".*?/blog/posts/en/(.*?)"', html)
    meta["en_slug"] = m.group(1) if m else None

    return meta


def main() -> int:
    if not POSTS_DE.is_dir():
        print(f"error: {POSTS_DE} not found", file=sys.stderr)
        return 1

    posts = []
    for path in sorted(POSTS_DE.glob("*.html")):
        posts.append(extract(path.read_text(encoding="utf-8"), path))
    posts.sort(key=lambda p: p["published"], reverse=True)

    lines = [
        "# claude.compact.md — Blog-Index",
        "",
        "<!-- GENERATED FILE — do not edit by hand. -->",
        "<!-- Regenerate with: python3 scripts/build-compact.py -->",
        "",
        f"Kompakter Index aller Blogposts ({len(posts)} Stück, neueste zuerst).",
        "DE ist die kanonische Sprache; EN/ZH-Übersetzungen liegen unter",
        "`blog/posts/en/` bzw. `blog/posts/zh/` (ZH nutzt den EN-Slug).",
        "",
    ]

    for p in posts:
        langs = ["de"]
        if p["en_slug"]:
            en = POSTS_DE.parent / "en" / p["en_slug"]
            zh = POSTS_DE.parent / "zh" / p["en_slug"]
            if en.exists():
                langs.append("en")
            if zh.exists():
                langs.append("zh")
        dates = p["published"]
        if p["modified"] and p["modified"] != p["published"]:
            dates += f" (aktualisiert {p['modified']})"

        lines += [
            f"## {p['title']}",
            "",
            f"- **Datum:** {dates}",
            f"- **Datei:** `blog/posts/de/{p['file']}`",
            f"- **Link:** [{p['url'].removeprefix(BASE_URL)}]({p['url']})",
            f"- **Sprachen:** {', '.join(langs)}",
            f"- **Zusammenfassung:** {p['description']}",
            "",
        ]

    OUTPUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"wrote {OUTPUT.relative_to(ROOT)} ({len(posts)} posts)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
