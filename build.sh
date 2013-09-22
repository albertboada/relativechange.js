#!/bin/bash

GHPAGES="../gh-pages"
grunt
rm -fr ${GHPAGES}/*
mkdir ${GHPAGES}/demo
cp -vr dist/demo/* ${GHPAGES}/demo/
cp -v dist/math.relativechange.min.js ${GHPAGES}/
