import VuePlugin from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite';
import Markdown from 'vite-plugin-md'
import { resolve } from "path";
import { linkPlugin } from './markdown-it-plugins/link';
import * as fs from "fs";
import * as path from "path";

const markdownScripts = fs.readFileSync(path.resolve(__dirname, "./templates/markdown.html"));

export default defineConfig({
  plugins: [
    VuePlugin({
      include: [/\.vue$/, /\.md$/],
    }),
    VueJsx(),
    Markdown({
      transforms: {
        after: (code: string, id: string) => {
          // 使用 naive-ui 组件替代原生标签
          let result = code
          const keywordPool: [string, string][] = [
            ["<p>", "<n-p>"],
            ["</p>", "</n-p>"],
            ["<h1>", "<n-h1>"],
            ["</h1>", "</n-h1>"],
            ["<h2>", "<n-h2>"],
            ["</h2>", "</n-h2>"],
            ["<h3>", "<n-h3>"],
            ["</h3>", "</n-h3>"],
            ["<h4>", "<n-h4>"],
            ["</h4>", "</n-h4>"],
            ["<h5>", "<n-h5>"],
            ["</h5>", "</n-h5>"],
            ["<h6>", "<n-h6>"],
            ["</h6>", "</n-h6>"],
            ["<blockquote>", "<n-blockquote>"],
            ["</blockquote>", "</n-blockquote>"],
            ["<img", "<n-image"],
            ["<a", "<n-a"],
            ["</a>", "</n-a>"],
          ]
          for (const [s, t] of keywordPool) {
            result = result.replace(new RegExp(s, "g"), t)
          }
          console.log(result)
          result += markdownScripts;
          return result
        }
      },
      markdownItOptions:{
        xhtmlOut: true,
      },
      markdownItSetup(md) {
        md.use(linkPlugin, {
          target: '_blank',
          rel: 'noopener noreferrer'
        })
      },
    }),
  ],
  build: {
    outDir: process.env.MODE === "SSG" ? "dist/static" : "dist",
    // minify: false,
  },
  ssgOptions: {
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
