// @ts-check
import * as fs from 'fs';
import * as path from 'path';
import express from 'express';
import type { ViteDevServer } from 'vite';


const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

export let app:ReturnType<typeof express>

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  // @ts-ignore
  const resolve = (p) => path.resolve(__dirname, p)

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : ''

  const manifest = isProd
    ? // @ts-ignore
      require('./dist/client/ssr-manifest.json')
    : {}

  app = express()

  /**
   * @type {import('vite').ViteDevServer}
   */
  let devServer:ViteDevServer
  if (!isProd) {
    const vite = await import ('vite');
    const VuePlugin = await import ('@vitejs/plugin-vue');
    const VueJsx = await import('@vitejs/plugin-vue-jsx');
    const Markdown = await import ('vite-plugin-md');
    devServer = await vite.createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: 'ssr',
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100
        }
      },
      configFile: false,
      plugins: [
        // 讲 markdown 文件用 vue 插件进行构建
        VuePlugin.default({
          include: [/\.vue$/, /\.md$/],
        }),
        VueJsx.default(),
        Markdown.default(),
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
    })
    // use vite's connect instance as middleware
    app.use(devServer.middlewares)
  } else {
    // @ts-ignore
    app.use(require('compression')())
    app.use(
      // @ts-ignore
      require('serve-static')(resolve('dist/client'), {
        index: false
      })
    )
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('public/index.html'), 'utf-8')
        template = await devServer.transformIndexHtml(url, template)
        render = (await devServer.ssrLoadModule('/src/client/entry-server.ts')).render
      } else {
        template = indexProd
        // @ts-ignore
        render = require('./dist/server/entry-server.js').render
      }

      const [appHtml, preloadLinks, cssHtml] = await render(url, manifest, __dirname)

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--css-html-->`, cssHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      // @ts-ignore
      devServer && devServer.ssrFixStacktrace(e)
      // @ts-ignore
      console.log(e.stack)
      // @ts-ignore
      res.status(500).end(e.stack)
    }
  })

  // @ts-ignore
  return { app, devServer }
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(3000, () => {
      console.log('http://localhost:3000')
    })
  )
}

// for test use
// exports.createServer = createServer

