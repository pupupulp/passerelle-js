#!/bin/bash

if [[ "$(docker images -q pupupulp/passerelle-js:1.0 2> /dev/null)" == "" ]]; then
    docker build -t pupupulp/passerelle-js:1.0 .
fi

if [ ! "$(docker ps -q -f name=passerelle)" ]; then
    if [ "$(docker ps -aq -f status=exited -f name=passerelle)" ]; then
        # cleanup
        docker rm --force passerelle
    fi
    # run your container
    docker run -d \
        --name="passerelle" \
        -p 9000:9000 \
        pupupulp/passerelle-js:1.0
fi