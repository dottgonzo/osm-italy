#!/bin/sh

cat ./root/proxy.conf | sed s/${GEO_PSK:-TESTPSK}/SS/g > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'