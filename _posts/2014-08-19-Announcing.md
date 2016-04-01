---
  layout: post
  title: "NS Docker Images"
  image: http://will.blankenship.io/images/nodesource2.png
  summary: NodeSource is rolling out a line of Docker images based on the binary Ubuntu and Debian distributions we maintain in collaboration with Chris Lea
---

# {{ page.title }}

Cross post from [https://nodesource.com/blog/nodesource-docker-images](https://nodesource.com/blog/nodesource-docker-images)

Note, the images described in this blog post have been depreciated. Checkout [https://github.com/nodesource/docker-node](https://github.com/nodesource/docker-node) for the awesome new images which offer version pinning.

## Containerize All The Things!

NodeSource is rolling out a line of Docker images based on the binary Ubuntu and Debian distributions we maintain in [collaboration with Chris Lea](https://nodesource.com/blog/chris-lea-joins-forces-with-nodesource).

Although a relatively new product, Docker has quickly become an essential part of many companies' deployment environments. The new NodeSource images aim to simplify and standardize containierized Node.js application deployments.

The new images are hosted on [Docker Hub](https://hub.docker.com/) at: **<https://registry.hub.docker.com/u/nodesource/node>**

## So What Is Docker?

For those new to the Docker scene, Docker is a solution for deploying bundled applications via Linux containers. Containers are a lightweight substitute for virtual machines, using [cgroups/namespaces](http://en.wikipedia.org/wiki/Cgroups) to isolate processes and file systems while allowing processes to run directly on the host's hardware and kernel. Linux containers are similar to Solaris zones. Docker uses a git-style version control system, meaning updating an image simply pulls down changes to the file system and not an entirely new disk image.

## Available Platforms

To accommodate the DevOps teams who are considering getting their feet wet with Docker, we are providing images based on most of the supported Linux distributions of the NodeSource binary distribution. This enables you to easily port your existing Node.js applications to Docker, even if they have OS-level dependencies. Another huge win for DevOps teams is that the images include a pre-primed version of node-gyp ready for use if you need to `npm install` compiled add-ons within your containers.

**Ubuntu**

* **Ubuntu 12.04 LTS** (Precise Pangolin)
* **Ubuntu 14.04 LTS** (Trusty Tahr)

**Debian**

* **Debian 7 / stable** (wheezy)
* **Debian testing** (jessie)
* **Debian unstable** (sid)

## Usage

### Pulling The Containers

All distributions exist as tags on the _nodesource/node_ image on Docker Hub as follows:

* _nodesource/node:precise_
* _nodesource/node:trusty_
* _nodesource/node:wheezy_
* _nodesource/node:jessie_
* _nodesource/node:sid_

Each distribution is built directly on top of the [official repositories](https://registry.hub.docker.com/) maintained by the Docker team. The *latest* tag points to *jessie* so that's what you'll get if you don't supply a tag.

If you want to run an image based on Debian's *wheezy* release, for example, you would simply:

{% highlight bash %}
$ docker pull nodesource/node:wheezy
{% endhighlight %}

You can even quickly run a Node.js REPL in a container based on any of the images:

{% highlight text %}
$ docker run -t -i nodesource/node:trusty node
> process.versions
{ http_parser: '1.0',
  node: '0.10.30',
  v8: '3.14.5.9',
  ares: '1.9.0-DEV',
  uv: '0.10.28',
  zlib: '1.2.3',
  modules: '11',
  openssl: '1.0.1h' }
>
{% endhighlight %}

### Containerizing Your Application

A quick-start to containerizing your application involves placing a _Dockerfile_ in the root of your project directory, alongside your _package.json_ definition:

{% highlight Dockerfile %}
FROM nodesource/node:jessie

ADD . /path/to/app
WORKDIR /path/to/app

# install your application's dependencies
RUN npm install

# replace this with your application's default port
EXPOSE 8888

# replace this with your startup command
CMD [ "npm", "start" ]
{% endhighlight %}

Build your image with:

{% highlight text %}
$ docker build -t="my_node_app" .
{% endhighlight %}

And run with:

{% highlight text %}
$ docker run -dP my_node_app
{% endhighlight %}

### Mounting As A Volume

If you want to run a Node.js application from the host filesystem, you can simply mount it:

{% highlight Dockerfile %}
FROM nodesource/node:jessie

WORKDIR /path/to/app

# replace this with your application's default port
EXPOSE 8888

# replace this with your main "server" script file
CMD [ "bash","-c", "npm install; npm start" ]
{% endhighlight %}

Build your image with:

{% highlight text %}
$ docker build -t="my_node_app" .
{% endhighlight %}

And run with:

{% highlight text %}
$ docker run -dPv /path/to/app:/path/to/app my_node_app
{% endhighlight %}

You can even replace `npm start` with `npm test` if you want a containerized test environment for your application!

## Comments, Questions, Contributions?

Our images are built directly from the source Dockerfiles hosted on GitHub at: <https://github.com/nodesource/docker-node>. With each new Node.js release we will trigger a build on [Docker Hub](https://registry.hub.docker.com/u/nodesource/node/).

We welcome contributions and discussion on the repo and want to make these images as useful as possible to the Node.js community!
