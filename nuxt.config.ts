import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
  extensions:[
    ".js",
    ".mjs",
    ".ts",
    ".tsx",
    ".vue",
    ".css"
  ],
  vite: process.env.NODE_ENV !== 'production',
  meta:{
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'public/favicon.ico' }
    ],
    style:[
      {
        cssText:`
          [v-cloak] {
            visibility: hidden;
          }
        `,
        type: 'text/css'
      }
    ]
  }
})
