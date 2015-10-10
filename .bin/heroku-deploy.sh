#!/usr/bin/env bash

cd ../melhoreme-build \
&& pwd \
&& git init \
&& pwd \
&& heroku git:remote -a melhoreme \
&& pwd \
&& git add . \
&& pwd \
&& git commit -m "gulp-commit" --allow-empty \
&& pwd \
&& git push -f heroku master