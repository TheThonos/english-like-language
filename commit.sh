#!bin/bash

cd $1
git init
git add .
git commit -m $3
git remote add origin $2
git push -u origin master