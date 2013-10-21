#!/bin/bash

GHPAGES="../gh-pages"
grunt
rm -fr ${GHPAGES}/*
mkdir ${GHPAGES}/demo
mkdir ${GHPAGES}/dist
cp -vr demo/* ${GHPAGES}/demo/
cp -v dist/relativechange.min.js ${GHPAGES}/dist/
