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

**Note**: _For latest version of docker-compose, and other installation guide please check https://docs.docker.com/compose/install/._

1. **Install with curl**

```cli
$ sudo curl \
    -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-$(uname -s)-$(uname -m)" \
    -o /usr/local/bin/docker-compose
```

2. **Apply executable permission**

```cli
$ sudo chmod +x /usr/local/bin/docker-compose
```

#### Docker Machine Setup

**Note**: _For latest version of docker-machine, and other installation guide please check https://docs.docker.com/machine/install-machine/._

1. **Install with curl**

```cli
$ base=https://github.com/docker/machine/releases/download/v0.16.0 &&
    curl -L $base/docker-machine-$(uname -s)-$(uname -m) >/tmp/docker-machine &&
    sudo install /tmp/docker-machine /usr/local/bin/docker-machine
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

### Deploying with replication

1. **Install virtualbox, check https://www.virtualbox.org/wiki/Downloads (optional if you already have)**

2. **Create a master machine, acts as a node manager**
```cli
$ docker-machine create --driver virtualbox passerelle-master
```

3. **Create a slave machine acts a worker node, this could be many**
```cli
$ docker-machine create --driver virtualbox passerelle-slave
```

4. **Check created machine and take note of the IP address of master, it would be used later**
```cli
$ docker-machine ls
```

5. **Initialize a swarm on master, this would make the master a node manager, replace _passerelle-master ip_ with the IP address you saw on previous command without the port. Take note of the command that would be shown**
```cli
$ docker-machine ssh passerelle-master "docker swarm init --advertise-addr <passerelle-master ip>"
```
6. **Use command from previous step to join slave on master node, do this with your other slave machines**
```cli
# Sample command from previous step, DO NOT RUN THIS
$ docker swarm join --token SWMTKN-1-240wg9uk3gyak4rmelbiedxxg4gdt2xaetqzwo8nm2mc5a6kle-31rynanmbefzdnz7jlmofkhij 192.168.99.102:2377
```

```cli
$ docker-machine ssh passerelle-slave "<command_from_previous_step>"
```

7. **Check master for list of nodes to see if slave nodes are successfully added**
```cli
$ docker-machine ssh passerelle-master "docker node ls"
```

8. **Configure docker-machine shell to master**
```cli
$ docker-machine env passerelle-master
```

9. **Run the given command to configure your shell to talk to master**
```cli
$ eval $(docker-machine env passerelle-master)
```

10. **Check if master is now the active machine, as indicated by the asterisk next to it**
```cli
$ docker-machine ls
```

11. **Build docker image on master (skip if you are using an image on a repository)**
```cli
$ docker build -t pupupulp/passerelle-js:1.0 .
```

12. **Repeat steps 8-11 for slave since it also needs an image to be built (skip if you are using an image on a repository)**

13. **Login to your image repository, only if you are using an image on a repository (optional for this project)**
```cli
$ docker login registry.example.com
```

14. **Deploy app with registry auth, only if you are using an image on a repository (optional for this project)**
```cli
$ docker stack deploy --with-registry-auth -c docker-compose.yml getstartedlab
```
15. **Deploy app**
```cli
$ docker stack deploy -c docker-compose.yml passerelle
```

16. **Check services running (optional)**
```cli
$ docker service ls
```

17. **For unsetting docker-machine shell env (optional)**
```cli
$ eval $(docker-machine env -u)
```

18. **For leaving swarm (optional guide)**
```cli
$ docker-machine ssh <machine_name> "docker swarm leave --force"
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