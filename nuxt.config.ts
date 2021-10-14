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
  vite: process.env.NODE_ENV !== 'production'
})
