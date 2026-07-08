#!/usr/bin/env bash
# Submit all sitemap URLs to IndexNow (Bing / Yandex / Seznam, and therefore
# ChatGPT search, which retrieves from Bing's index).
#
# One POST to api.indexnow.org fans out to every participating engine, so there
# is no need to ping each one separately. Run this after each deploy, or let the
# GitHub Actions workflow (.github/workflows/indexnow.yml) run it automatically.
#
# Usage: ./tools/indexnow-submit.sh
set -euo pipefail

HOST="waiser.dev"
KEY="d33a1e2edcb461fe0d56bc0c99b73af9"
KEY_LOCATION="https://${HOST}/${KEY}.txt"
SITEMAP="https://${HOST}/sitemap.xml"

# Extract <loc> URLs from the live sitemap.
mapfile -t URLS < <(curl -fsS "$SITEMAP" | grep -oE '<loc>[^<]+</loc>' | sed -E 's/<\/?loc>//g')

if [ "${#URLS[@]}" -eq 0 ]; then
  echo "No URLs found in ${SITEMAP} — aborting." >&2
  exit 1
fi

echo "Submitting ${#URLS[@]} URLs to IndexNow for ${HOST}..."

# Build the JSON urlList array.
urls_json=$(printf '"%s",' "${URLS[@]}")
urls_json="[${urls_json%,}]"

body=$(cat <<EOF
{
  "host": "${HOST}",
  "key": "${KEY}",
  "keyLocation": "${KEY_LOCATION}",
  "urlList": ${urls_json}
}
EOF
)

curl -sS -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "$body" -w "\nHTTP %{http_code}\n"
