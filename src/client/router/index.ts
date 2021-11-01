import {
  createMemoryHistory,
  createWebHistory
} from 'vue-router'


const pages = import.meta.glob('../pages/*.vue')
export const routes = Object.keys(pages).map((path) => {
  const name = (path.match(/\.\/pages(.*)\.vue$/) as string[])[1].toLowerCase()
  return {
    path: name === '/index' ? '/' : name,
    component: pages[path] // () => import('./pages/*.vue')
  }
})


export default { 
  routes,
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
}
