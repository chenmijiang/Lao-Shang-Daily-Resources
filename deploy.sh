#!/usr/bin/env sh
set -e
yarn build
cd docs

if [ "init" = $1 ] ; then
  rm -rf .git
  git init
  git add -A
  git commit -m 'deploy'
else
  git add -A
  time=$(date "+%Y-%m-%d %H:%M")
  git commit -m "$time"
fi

git push -f git@github.com:chenmijiang/Lao-Shang-Daily-Resources.git main:main
cd -