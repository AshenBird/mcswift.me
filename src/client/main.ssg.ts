// src/main.ts
import { ViteSSG } from 'vite-ssg'
import { setup } from "@css-render/vue3-ssr";
import App from './App.vue'

import routerOptions from './router/index'
import {ref} from "vue"

// `export const createApp` is required
export const createApp = ViteSSG(
  // the root component
  App,
  // vue-router options
  { ...routerOptions },
  // function to have custom setups
  ({ app, router, routes, isClient, initialState, head }) => {
    // install plugins etc.
    if( !isClient && head){
      const { collect }=setup(app);
      head.addHeadObjs(ref({
        style:[
          {
            children: collect()
          }
        ]
      }))
    }
  }
)