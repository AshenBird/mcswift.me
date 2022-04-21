import VuePlugin from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite';
import { resolve } from "path";


export default defineConfig({
  root:resolve(__dirname, "./client"),
  plugins: [
    VuePlugin(),
    VueJsx(),
  ],
  server: {
    host: "0.0.0.0",
    port: 9999
  },
  build: {
    outDir: "../server/view"
  },
  resolve: {
    // 别名
    alias: {
      "@": resolve(__dirname, "./src/client")
    },
  },
})
