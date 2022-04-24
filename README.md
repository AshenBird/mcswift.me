# McSwift 的个人网站

## Setup | 配置

### 环境

- node 不低于 v14 的版本，建议使用最新的 LTS 版本

### 安装依赖

``` shell

yarn

# or

npm i

```

### 暂时需要锁定版本的依赖

#### vite-plugin-md 0.11.9

升级到 0.12 后， transforms 钩子中的 after 函数无法正确起作用。

#### vite-ssg 0.15.5

更高版本的 vite-ssg 存在与 naive-ui 的兼容问题。不确定是，哪个包的问题。暂时通过锁定 vite-ssg 版本来避免。

## Development | 开发

Start the development server on <http://localhost:3000>  
在 <http://localhost:3000> 启动开发服务器

### 标准模式（ CSR 客户端渲染 ）

``` shell
yarn dev

# or

npm run dev

```

### 服务端渲染模式（ SSR 服务端渲染 ） --TODO

服务端渲染模式尚不健全

``` shell
yarn dev:ssr

# or

npm run dev:ssr

```

## Production | 生产

Build the application for production:  
构建应用

### 标准单页面模式（ CSR 客户端渲染 ）

``` shell
yarn build:client

# or

npm run build:client

```

### 服务端渲染单页面模式（ SSR 服务端渲染 ）--TODO

服务端渲染模式尚不健全

``` shell
yarn build:ssr

# or

npm run build:ssr

```

### 静态生成模式（ SSG 服务端生成 ）

现在主要采用本模式

``` shell
yarn build:ssg

# or

npm run build:ssg

```

## License | 协议

本项目代码部分遵循 <a href='./LICENSE'>MIT</a> 协议。  
本项目作为文字作品，以及其中的包含的文字、图像等，遵循 <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/'>CC BY-NC-SA 4.0</a> 协议 ( <a href='https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh'>CC BY-NC-SA 4.0 中文版</a> )
