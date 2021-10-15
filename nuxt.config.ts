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
    title:"McSwift",
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ],
    style:[
      {
        text:`
          [v-cloak] {
            visibility: hidden;
          }
        `,
        type: 'text/css'
      }
    ]
  },
})
