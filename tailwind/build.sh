#!/usr/bin/env bash
# Regenerate the prebuilt, minified Tailwind stylesheet (css/tailwind.css).
#
# This replaces the render-blocking Play CDN (cdn.tailwindcss.com) with a small
# static file. Run this whenever you add/remove Tailwind utility classes in any
# HTML file or in js/*.js (header/footer/components are injected at runtime).
#
# Requires the Tailwind v3 standalone CLI. If it's not on PATH, download it:
#   curl -sL -o ./tailwind/tailwindcss \
#     https://github.com/tailwindlabs/tailwindcss/releases/download/v3.4.17/tailwindcss-macos-arm64
#   chmod +x ./tailwind/tailwindcss
set -euo pipefail
cd "$(dirname "$0")/.."

BIN="./tailwind/tailwindcss"
if [ ! -x "$BIN" ]; then
  if command -v tailwindcss >/dev/null 2>&1; then
    BIN="$(command -v tailwindcss)"
  else
    echo "Tailwind CLI not found. See header of this script for the download command." >&2
    exit 1
  fi
fi

"$BIN" \
  --config ./tailwind/tailwind.config.js \
  --input ./tailwind/input.css \
  --output ./css/tailwind.css \
  --minify

echo "Wrote css/tailwind.css ($(du -h ./css/tailwind.css | cut -f1))"
