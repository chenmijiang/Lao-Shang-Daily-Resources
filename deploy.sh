#!/usr/bin/env sh
set -e

if [ $1 ] && [[ $1 =~ ^[0-9]{4}-[0-9]{2}-[0-9]{2}$ ]] ; then
  yarn build $1
else
  yarn build
fi

cd docs

if ([ $1 ] && [ "init" = $1 ]) || ([ $2 ] && [ "init" = $2 ]) ; then
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