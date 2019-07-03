# passerelle-js

![contributors](https://badgen.net/github/contributors/pupupulp/passerelle-js)
![stars](https://badgen.net/github/stars/pupupulp/passerelle-js)
![commits](https://badgen.net/github/commits/pupupulp/passerelle-js)
![last commit](https://badgen.net/github/last-commit/pupupulp/passerelle-js)
[![License](https://badgen.net/github/license/pupupulp/passerelle-js)](https://github.com/pupupulp/passerelle-js/blob/master/LICENSE)

An opensource API gateway built with ExpressJS

## Quickstart

### Installation

#### Docker Setup

1. **CentOS**

```cli
$ sudo yum install -y yum-utils \
    device-mapper-persistent-data \
    lvm2

$ sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

$ sudo yum install docker-ce docker-ce-cli containerd.io

$ sudo systemctl start docker
```

2. **Debian**

```cli
$ sudo apt-get update

$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg2 \
    software-properties-common

$ curl -fsSL https://download.docker.com/linux/debian/gpg | sudo apt-key add -

$ sudo apt-key fingerprint 0EBFCD88

$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/debian \
   $(lsb_release -cs) \
   stable"

$ sudo apt-get update

$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

3. **Fedora**

```cli
$ sudo dnf -y install dnf-plugins-core

$ sudo dnf config-manager \
    --add-repo \
    https://download.docker.com/linux/fedora/docker-ce.repo

$ sudo dnf install docker-ce docker-ce-cli containerd.io

$ sudo systemctl start docker
```

4. **Ubuntu**

```cli
$ sudo apt-get update

$ sudo apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    gnupg-agent \
    software-properties-common

$ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

$ sudo apt-key fingerprint 0EBFCD88

$ sudo add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

$ sudo apt-get update

$ sudo apt-get install docker-ce docker-ce-cli containerd.io
```

5. **[MacOS](https://docs.docker.com/docker-for-mac/install/)**
6. **[Windows](https://docs.docker.com/docker-for-windows/install/)**

#### Docker Compose Setup

Note: For latest version of docker-compose please check https://docs.docker.com/compose/install/.

1. Install with curl

```cli
$ sudo curl \
    -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" \
    -o /usr/local/bin/docker-compose
```

2. Apply executable permission

```cli
$ sudo chmod +x /usr/local/bin/docker-compose
```

#### App Setup

1. **Clone the repository**

```cli
$ git clone https://github.com/pupupulp/passerelle-js.git
```

2. **Go to source directory**
```cli
$ cd passerelle-js
```

3. **Build docker image**
```cli
$ docker build -t pupupulp/passerelle-js:1.0 .
```


### Usage
**Run docker image**
```cli
$ docker run -d \
    --name="passerelle" \
    -p 9000:9000 \
    --mount type=bind,source=$(pwd)/src,target=/usr/src/passerelle/src,readonly \
    pupupulp/passerelle-js:1.0
```

### Build
1. **Change permission of script**
```cli
$ chmod +x src/scripts/build.sh
```

2. **Run the script**
```cli
$ src/scripts/build.sh
```

## About

### Contributing

Pull requests and stars are always welcome. For bugs and feature requests, please [create an issue](https://github.com/pupupulp/passerelle-js/issues/new).

### Related Projects

You might want to checkout these projects:

- [KonyvtarJS](https://github.com/pupupulp/konyvtar-js) - An opensource library/package of code wrappers for ExtJS 6.2.0 GPL.
- [NchikotaJS](https://github.com/pupupulp/nchikota-js) - An opensource tech stack composed of ExpressJS, NodeJS, ExtJS.

### Contributors

### Author

**Eagan Martin**
- [Github](https://github.com/pupupulp)
- [LinkedIn](https://www.linkedin.com/in/eagan-charles-martin-a5a172186/)

### License

Copyright © 2019, [Eagan Martin](https://github.com/pupupulp). Release under the [MIT License](https://github.com/pupupulp/passerelle-js/blob/master/LICENSE)