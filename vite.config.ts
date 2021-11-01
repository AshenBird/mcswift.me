import VuePlugin from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite';
import Markdown from 'vite-plugin-md'
import { resolve } from "path";

export default defineConfig({
  plugins: [
    // 讲 markdown 文件用 vue 插件进行构建
    VuePlugin({
      include: [/\.vue$/, /\.md$/],
    }),
    VueJsx(),
    Markdown(),
  ],
  build: {
    minify: false,
    rollupOptions:{
      input: resolve(__dirname, "./public/index.html"),
    }
  },
  resolve: {
    // 别名
    alias: {
      "@": resolve(__dirname, "./src/client"),
    },
  },
})
