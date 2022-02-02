#!/bin/sh

cat /proxy.conf | sed s/TESTPSK/AAAA/g > /etc/nginx/conf.d/default.conf && cat /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'