#!/bin/bash -ex
set -o pipefail

# Usage:
# Run this script in project root directory: `sh rpm/build_rpm.sh`
# Make sure environment variable http_proxy, https_proxy are set properly

# --- Common functions


# -- Switch node.js version
npm install n -g
/usr/local/bin/n 6.8.0

# --- Build and test
npm run ci | ./node_modules/.bin/bunyan -l fatal

# --- Prepare for release
npm prune --production
# `npm prune` removes all modules that are not listed in dependencies in package.json, have to extract again:
extract_bin_modules

npm pack

# --- Extrace into ./package
rm -rf package
tar -zxf *.tgz
mv node_modules package/

# --- Modify spec file
cp rpm/rpm.spec rpm/target.spec

timestamp=`date +%Y%m%d%H%M%S`
sed -i -e "s/__timestamp__/${timestamp}/" rpm/target.spec

commit=`git log -1 | sed -n '/^commit/p' | sed 's/commit //'`
sed -i -e "s/__commit__/${commit}/" rpm/target.spec

name=`grep '%define _name' rpm/target.spec | awk -F ' ' '{print $3}'`
version=`grep '%define version' rpm/target.spec | awk -F ' ' '{print $3}'`

# --- Build RPM
rpmbuild -ba rpm/target.spec

