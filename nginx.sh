#!/bin/sh

sed s/TESTPSK/$GEO_PSK/g /proxy.conf | tee /etc/nginx/nginx.conf && nginx -g "daemon off;"