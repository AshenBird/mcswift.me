import {
  // createMemoryHistory,
  createRouter as _createRouter,
  // createWebHistory
} from 'vue-router'

import routerOptions from './router/index'

// // Auto generates routes from vue files under ./pages
// // https://vitejs.dev/guide/features.html#glob-import
// // 自动生成路由
// const pages = import.meta.glob('./pages/*.vue')

// const routes = Object.keys(pages).map((path) => {
//   const name = (path.match(/\.\/pages(.*)\.vue$/) as string[])[1].toLowerCase()
//   return {
//     path: name === '/index' ? '/' : name,
//     component: pages[path] // () => import('./pages/*.vue')
//   }
// })

export function createRouter() {
  return _createRouter({
    // use appropriate history implementation for server/client
    // import.meta.env.SSR is injected by Vite.
    // history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    // routes
    ...routerOptions
  })
}
