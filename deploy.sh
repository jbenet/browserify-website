#!/bin/sh
echo '==> deploying website'
git checkout -b deploy
make clean
make
git add -f build/
git commit -m "payload"
git filter-branch --subdirectory-filter build/ -f
git push origin deploy:gh-pages
git checkout master
git branch -D deploy
