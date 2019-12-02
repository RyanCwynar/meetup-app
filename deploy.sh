#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
echo 'joinus.ryancwynar.com' > CNAME
cp index.html login.html
cp index.html 404.html

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git remote add origin https://github.com/RyanCwynar/meetup-app.git
git push -f origin master:gh-pages

cd -