#!/bin/sh

sed s/TESTPSK/AAAA/g /proxy.conf | tee /etc/nginx/nginx.conf && nginx -g "daemon off;"