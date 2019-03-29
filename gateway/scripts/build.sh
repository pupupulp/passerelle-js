#!/bin/bash

docker build -t pupupulp/passerellejs:1.0 .

if [ ! "$(docker ps -q -f name=passerelle)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=passerelle)" ]; then
        # cleanup
        docker rm --force passerelle
    fi
    # run your container
    docker run -d \
        --name="passerelle" \
        -p 9000:9000 \
        --mount type=bind,source=$(pwd)/gateway,target=/usr/src/passerelle/gateway,readonly \
        pupupulp/passerellejs:1.0
fi