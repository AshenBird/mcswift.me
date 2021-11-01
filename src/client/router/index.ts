import {
  createMemoryHistory,
  createWebHistory
} from 'vue-router'
import {BlogRoute} from './blog';

const pages = import.meta.glob('../pages/*.vue')

const pageRoutes = Object.keys(pages).map((path) => {
  const name = (path.match(/\.\/pages(.*)\.vue$/) as string[])[1].toLowerCase()
  return {
    path: name === '/index' ? '/' : name,
    component: pages[path], // () => import('./pages/*.vue')
  }
})
export const routes = [
  ...pageRoutes,
  BlogRoute
]

export default { 
  routes,
  history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
}
