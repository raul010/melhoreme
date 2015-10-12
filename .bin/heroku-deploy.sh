#!/usr/bin/env bash

$1;
cd ../melhoreme-build \
echo "App Deploy:" && pwd \
&& git init \
&& heroku git:remote -a melhoreme \
&& heroku config:set NODE_MODULES_CACHE=$1 \
&& git add . \
&& git commit -m "gulp-commit" --allow-empty \
&& git push -f heroku master