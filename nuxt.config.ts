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
  vite: false,//process.env.NODE_ENV !== 'production',
  meta:{
    title:"McSwift",
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'favicon.ico' }
    ],
  },
})
