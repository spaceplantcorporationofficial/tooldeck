#!/bin/sh
# Build, verify, and publish dist/ to the gh-pages branch.
set -e
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"
node build.mjs && node check.mjs
REMOTE=$(git remote get-url origin)
cd dist
rm -rf .git && git init -q -b gh-pages
git add -A && git -c user.name=tooldeck-bot -c user.email=bot@tooldeck.local commit -qm "Deploy $(date -u +%Y-%m-%dT%H:%MZ)"
git push -qf "$REMOTE" gh-pages
rm -rf .git
echo "Deployed."
# Give Pages ~60s to publish, then notify search engines.
cd "$ROOT"
sleep 60
node indexnow.mjs || true
