# Build Stage
FROM mhart/alpine-node:latest AS APP_BUILDER

# Maintainer
MAINTAINER Eagan Martin <mece.martinece@gmail.com>

# App setup environment variables
ENV APP_BRANCH=master \
    APP_GIT=https://github.com/pupupulp/passerelle-js.git \
    APP_PATH=/usr/src/passerelle \
    PRODUCTION_ONLY=true

# Dependency installation
RUN apk update \
    && apk upgrade \
    && apk add --no-cache \
        bash \
        git \
        openssh \
        make \
        gcc \
        g++ \
        python \
    && python -m ensurepip \
    && pip install --upgrade pip setuptools \
    && rm -r /usr/lib/python*/ensurepip \
    && rm -r /root/.cache \
    && rm -rf /var/lib/apt/lists/* \
    && rm /var/cache/apk/*

# App setup
WORKDIR ${APP_PATH}
RUN git clone --single-branch --branch ${APP_BRANCH} ${APP_GIT} ./ \
    && npm cache clean --force \
	&& npm install -g node-gyp \
	&& yarn install --production=${PRODUCTION_ONLY}

# Release Stage
FROM mhart/alpine-node:slim AS APP_RELEASE

# Maintainer
MAINTAINER Eagan Martin <mece.martinece@gmail.com>

# App environment variables
ENV APP_PATH=/usr/src/passerelle \
	APP_PORT=9000

# Migrate app from builder stage
WORKDIR ${APP_PATH}
COPY --from=0 ${APP_PATH} .
COPY . .

# Expose app
EXPOSE ${APP_PORT}

# Start app
CMD ["node", "./src/scripts/forever-start.js"]