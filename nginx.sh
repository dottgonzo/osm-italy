#!/bin/sh

cat /proxy.conf | sed s/TESTPSK/${GEO_PSK:-TESTPSK}/g > /etc/nginx/conf.d/default.conf && cat /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'