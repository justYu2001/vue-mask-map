#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

git init
git add -A
git commit -m 'deploy'
git branch -M gh-pages
git remote add origin https://github.com/justYu2001/vue-mask-map.git
git push -f origin gh-pages

cd -