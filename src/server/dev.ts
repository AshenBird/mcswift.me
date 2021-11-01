import * as fs from 'fs';
import * as path from 'path';
import express from 'express';
import vite from 'vite';
import VuePlugin from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Markdown from 'vite-plugin-md'
const root = process.cwd()

export let app = express()

export async function createServer(
) {
  // @ts-ignore
  const resolve = (p) => path.resolve(__dirname, p)

  const indexProd = ''

  const manifest = {}
  /**
   * @type {import('vite').ViteDevServer}
   */
  const devServer = await vite.createServer({
    root,
    logLevel:  'info',
    configFile: false,
    server: {
      middlewareMode: 'ssr',
      watch: {
        // During tests we edit the files too fast and sometimes chokidar
        // misses change events, so enforce polling for consistency
        usePolling: true,
        interval: 100
      }
    },
    plugins: [
      // 讲 markdown 文件用 vue 插件进行构建
      VuePlugin({
        include: [/\.vue$/, /\.md$/],
      }),
      VueJsx(),
      Markdown(),
    ],
    build: {
      minify: false,
    },
    resolve: {
      // 别名
      alias: {
        "@": resolve("../"),
      },
    },
    
  }).catch(e=>{
    console.log(e)
  })
  // // use vite's connect instance as middleware
  // app.use(devServer.middlewares)

  // app.use('*', async (req, res) => {
  //   try {
  //     const url = req.originalUrl

  //     let template, render
  //     // always read fresh template in dev
  //     template = fs.readFileSync(resolve('../../public/index.html'), 'utf-8')
  //     template = await devServer.transformIndexHtml(url, template)
  //     render = (await devServer.ssrLoadModule('/src/client/entry-server.ts')).render

  //     const [appHtml, preloadLinks, cssHtml] = await render(url, manifest, __dirname)

  //     const html = template
  //       .replace(`<!--preload-links-->`, preloadLinks)
  //       .replace(`<!--app-html-->`, appHtml)
  //       .replace(`<!--css-html-->`, cssHtml)

  //     res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
  //   } catch (e) {
  //     // @ts-ignore
  //     devServer && devServer.ssrFixStacktrace(e)
  //     // @ts-ignore
  //     console.log(e.stack)
  //     // @ts-ignore
  //     res.status(500).end(e.stack)
  //   }
  // })

  // @ts-ignore
  return { app, devServer }
}

createServer().then(({ app }) =>
  app.listen(3000, () => {
    console.log('http://localhost:3000')
  })
)

