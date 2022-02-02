#!/bin/sh

cat /root/proxy.conf | sed s/TESTPSK/${GEO_PSK:-TESTPSK}/g > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'