// src/main.ts
import { ViteSSG } from 'vite-ssg'
import App from './App.vue'

import routerOptions from './router/index'

// `export const createApp` is required
export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { ...routerOptions },
  // function to have custom setups
  ({ app, router, routes, isClient, initialState }) => {
    // install plugins etc.
  }
)