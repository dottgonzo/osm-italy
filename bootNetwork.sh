#!/bin/bash

docker network create --driver=bridge --subnet=172.99.0.0/16 gis-net
docker network create nginx-proxy
