import * as fs from 'fs'
import * as path  from 'path'
import express from 'express'
import vite from "vite"


// 测试环境判断变量
const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

// 服务启动函数
async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  const resolve = (p) => path.resolve(__dirname, p)

  // const indexProd = isProd
  //   ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
  //   : ''

  const manifest = isProd
    ? // @ts-ignore
      (await ('./dist/client/ssr-manifest.json')).default
    : {}

  const app = express()

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite

  if (!isProd) {
    vite = (await import('vite')).createServer({
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
      }
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)
  } else {
    app.use((await import('compression'))())
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false
      })
    )
  }

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl

      let template, render
      // if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(resolve('index.html'), 'utf-8')
        template = await vite.transformIndexHtml(url, template)
        render = (await vite.ssrLoadModule('/src/entry-server.ts')).render
      // } else {
      //   template = indexProd
      //   // @ts-ignore
      //   render = (await import('./dist/server/entry-server.js')).render
      // }

      const [appHtml, preloadLinks] = await render(url, manifest, __dirname)

      const html = template
        .replace(`<!--preload-links-->`, preloadLinks)
        .replace(`<!--app-html-->`, appHtml)

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
    } catch (e) {
      vite && vite.ssrFixStacktrace(e)
      console.log(e.stack)
      res.status(500).end(e.stack)
    }
  })

  return { app, vite }
}
const {app} = await  createServer()

app.listen(3000, () => {
  console.log('http://localhost:3000')
})

export const viteNodeApp = app;
