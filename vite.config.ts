import VuePlugin from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite';
import Markdown from 'vite-plugin-md'
import { resolve } from "path";
import { linkPlugin } from './markdown-it-plugins/link'
export default defineConfig({
  plugins: [
    VuePlugin({
      include: [/\.vue$/, /\.md$/],
    }),
    VueJsx(),
    Markdown({
      markdownItSetup(md) {
        md.use(linkPlugin, {
          target: '_blank',
          rel: 'noopener noreferrer'
        })
      },
    }),
  ],
  build: {
    outDir:process.env.MODE==="SSG"?"dist/static":"dist"
    // minify: false,
  },
  ssgOptions:{
    mock: true
  },
  resolve: {
    // 别名
    alias: {
      "@": resolve(__dirname, "./src/client"),
      "~": resolve(__dirname, "./drafts"),
    },
  },
})
