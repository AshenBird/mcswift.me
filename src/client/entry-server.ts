import { createApp } from './main'
import { renderToString, SSRContext } from 'vue/server-renderer'
import path from 'path'

export async function render(url:string, manifest:Record<string, unknown>, rootDir:string) {
  const { app, router } = createApp()

  // set the router to the desired URL before rendering
  // 在渲染前，将需求的 URL 配置给路由 
  router.push(url)
  await router.isReady()

  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  // 传递 SSR 上下文对象， 这个上下文对象，可以通过 useSSRContext() 方法获得。
  // @vitejs/plugin-vue 将代码注入到组件的 setup() 函数中。这会将其自身注册到上下文对象的 modules 字段（ ctx.modules ）。
  // 
  const ctx:SSRContext = {}
  let html = await renderToString(app, ctx)

  // for testing. Use deep import built-in module. PR #5248
  const fs =
    process.versions.node.split('.')[0] >= '14'
      ? await import('fs/promises')
      : (await import('fs')).promises
  const msg = await fs.readFile(path.resolve(rootDir, './src/message'), 'utf-8')
  html += `<p class="file-message">msg read via deep import built-in module: ${msg}</p>`

  // the SSR manifest generated by Vite contains module -> chunk/asset mapping
  // which we can then use to determine what files need to be preloaded for this
  // request.
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest)
  return [html, preloadLinks]
}

function renderPreloadLinks(modules:string[], manifest:Record<string, unknown>) {
  let links = ''
  const seen = new Set()
  modules.forEach((id) => {
    const files = manifest[id] as string[]
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file)
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink(file:string) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else if (file.endsWith('.woff')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  } else if (file.endsWith('.woff2')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  } else if (file.endsWith('.gif')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
  } else if (file.endsWith('.png')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`
  } else {
    // TODO
    return ''
  }
}
