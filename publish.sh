#!/bin/sh

# This script will determine the type of release based on the git branch. When the default branch is used, it will be a `patch` that's published to npm under the `latest` dist-tag. Any other branch will be a `prelease` that's published to npm under the `alpha` dist-tag.

set -e;

if ! git diff-files --quiet; then
    echo "Can not publish with unstaged uncommited changes";
    exit 1;
fi;

if ! git diff-index --quiet --cached HEAD; then
    echo "Can not publish with staged uncommited changes";
    exit 1;
fi;

rm -rf node_modules
npm install

current_branch=$(git rev-parse --abbrev-ref HEAD)
default_branch=$(git remote show origin | sed -n '/HEAD branch/s/.*: //p')

if [ "$current_branch" != "$default_branch" ]; then
  bump='prerelease'
  tag='alpha'
  npm --no-git-tag-version version $bump --preid=$tag
  git push
  npm publish --tag $tag
else
  npm test;
  npm version ${1-patch}
  echo "Publishing NPM version: ${1-patch}"

  git push;
  git push --tags;
  npm publish;
fi
