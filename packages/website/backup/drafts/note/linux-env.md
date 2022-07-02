# 初始化一个 linux 开发环境的记录

最近为了方便验证一些想法，买了一个阿里云的 [轻量级服务器](https://www.aliyun.com/product/swas) 。自然需要简单配置一下开发环境，做一个简单的记录，为后面再有相似的需求时，可以我抄我自己。当然，把这个流程整合成一个脚本是最好的，抽空可以搞了。

## 安装必要的软件

因为我用的 Ubuntu 20 的镜像，所以我就只写 Ubuntu 20 的流程了。

### 前期准备

更新下 apt 镜像目录。安装一下可能会用到的安装依赖。

```bash
sudo apt update
sudo apt install unzip
```

### Git

参考：[Git (git-scm.com)](https://git-scm.com/download/linux)

```bash
sudo apt install git
```

### zsh

参考：[Oh My Zsh - a delightful & open source framework for Zsh](https://ohmyz.sh/)

```bash
sudo apt install zsh

sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

```

### fnm/node.js

我使用 fnm 来维护 node.js 的版本。

参考：[Schniz/fnm: 🚀 Fast and simple Node.js version manager, built in Rust (github.com)](https://github.com/Schniz/fnm#Installation)

```bash
curl -fsSL https://fnm.vercel.app/install | bash
fnm install 16
corepack enable
corepack prepare pnpm@latest --activate

```

:::warning
因为 fnm 的工作原理，是在 shell 的配置文件中加入对应的环境变量。所以，要注意，安装的时候是不是安装在自己常用的 shell 上。或者你需要在其他 shell 中也进行安装，请参考 fnm 文档。
:::

### Docker

参考：[Install Docker Engine on Ubuntu | Docker Documentation](https://docs.docker.com/engine/install/ubuntu/)

```bash
suod apt install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt update

sudo apt install docker-ce docker-ce-cli containerd.io
```

### Docker Compose

参考：[Install Docker Compose | Docker Documentation](https://docs.docker.com/compose/install/)

```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose
```
