import VuePlugin from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig, UserConfig } from 'vite';
import Markdown from 'vite-plugin-md'
import { resolve } from "path";
import { linkPlugin } from './markdown-it-plugins/link';
import { highlight } from "./markdown-it-plugins/highlight"
import { highlightLinePlugin } from "./markdown-it-plugins/highlightLines"
import { preWrapperPlugin } from "./markdown-it-plugins/preWrapper"
import { lineNumberPlugin } from "./markdown-it-plugins/lineNumbers"
import { containerPlugin } from "./markdown-it-plugins/containers"

// @ts-ignore
import taskListPlugin from "markdown-it-task-lists"
// @ts-ignore
import attrsPlugin from "markdown-it-attrs"
// @ts-ignore
import deflistPlugin from "markdown-it-deflist"
// @ts-ignore
import markPlugin from "markdown-it-mark"
import * as fs from "fs";
import * as path from "path";


const markdownScripts = fs.readFileSync(path.resolve(__dirname, "./templates/markdown.html"));


export const config:UserConfig  ={
  plugins: [
    VuePlugin({
      include: [/\.vue$/, /\.md$/],
    }),
    VueJsx(),
    Markdown({
      transforms: {
        // before:(code:string)=>{
        //   let result = code
        //   const keywordPool: [string, string][] = [
        //   ]
        //   for (const [s, t] of keywordPool) {
        //     result = result.replace(new RegExp(s, "g"), t)
        //   }
        //   return result
        // },
        after: (code: string, id: string) => {
          // 使用 naive-ui 组件替代原生标签
          let result = code
          const keywordPool: [string, string][] = [
            [`:::warning`, `<n-alert title="Warning" type="warning">`],
            [`:::`, `</n-alert>`],
            ["<p>", `<n-p>`],
            ["</p>", "</n-p>"],
            [`<h1>`, `<n-h1>`],
            ["</h1>", "</n-h1>"],
            [`<h2>`, `<n-h2 type="info" prefix="bar"><n-text>`],
            ["</h2>", "</n-text></n-h2>"],
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
            ["</a>", `&nbsp;<n-icon style="top:1px;"><ExternalLinkAlt/></n-icon></n-a>`],
            ["<ol>", "<n-ol>"],
            ["</ol>", "</n-ol>"],
            ["<ul", "<n-ul "],
            ["</ul>", "</n-ul>"],
            ["<li", "<n-li "],
            ["</li>", "</n-li>"],
            ["<mark", `<n-text tag="mark" type="warning"`],
            ["</mark>", "</n-text>"]
            // [
            //   `<input class="task-list-item-checkbox" checked="" disabled="" type="checkbox">`,
            //   `<n-checkbox :checked="true" style="cursor: auto;"></n-checkbox>`
            // ],
            // [
            //   `<input class="task-list-item-checkbox" disabled="" type="checkbox">`,
            //   `<n-checkbox :checked="false" style="cursor: auto;"></n-checkbox>`
            // ]
          ]
          for (const [s, t] of keywordPool) {
            result = result.replace(new RegExp(s, "g"), t)
          }
          
          // const [ tem, s ] = result.split(`</template>`)
          // result = tem + `<n-divider title-placement="left">到底了</n-divider>` +`</template>`+ s + markdownScripts
          result = result.slice(0, -6) + `<n-divider title-placement="left">到底了</n-divider></div>`
          result += markdownScripts;
          // console.log(result)
          return result
        }
      },
      markdownItOptions: {
        xhtmlOut: true,
        highlight
      },
      markdownItSetup(md) {
        md.use(preWrapperPlugin)
          .use(linkPlugin, {
            target: '_blank',
            rel: 'noopener noreferrer'
          })
          .use(highlightLinePlugin)
          .use(lineNumberPlugin)
          .use(deflistPlugin)
          .use(attrsPlugin)
          .use(markPlugin)
          .use(taskListPlugin)
      },
    }),
  ],
  server: {
    host: "0.0.0.0",
    port: 9000
  },
  build: {
    outDir: process.env.MODE === "SSG" ? "../../dist/static" : "../../dist",
    // minify: false,
  },
  ssgOptions: {
    mock: true,
    // format: 'cjs'
  },
  resolve: {
    // 别名
    alias: {
      "@": resolve(__dirname, "./src/client"),
      "%": resolve(__dirname, "./drafts"),
    },
  },
}


export default defineConfig(
  config
//   {
//   plugins: [
//     VuePlugin({
//       include: [/\.vue$/, /\.md$/],
//     }),
//     VueJsx(),
//     Markdown({
//       transforms: {
//         // before:(code:string)=>{
//         //   let result = code
//         //   const keywordPool: [string, string][] = [
//         //   ]
//         //   for (const [s, t] of keywordPool) {
//         //     result = result.replace(new RegExp(s, "g"), t)
//         //   }
//         //   return result
//         // },
//         after: (code: string, id: string) => {
//           // 使用 naive-ui 组件替代原生标签
//           let result = code
//           const keywordPool: [string, string][] = [
//             [`:::warning`, `<n-alert title="Warning" type="warning">`],
//             [`:::`, `</n-alert>`],
//             ["<p>", `<n-p>`],
//             ["</p>", "</n-p>"],
//             [`<h1>`, `<n-h1>`],
//             ["</h1>", "</n-h1>"],
//             [`<h2>`, `<n-h2 type="info" prefix="bar"><n-text>`],
//             ["</h2>", "</n-text></n-h2>"],
//             ["<h3>", "<n-h3>"],
//             ["</h3>", "</n-h3>"],
//             ["<h4>", "<n-h4>"],
//             ["</h4>", "</n-h4>"],
//             ["<h5>", "<n-h5>"],
//             ["</h5>", "</n-h5>"],
//             ["<h6>", "<n-h6>"],
//             ["</h6>", "</n-h6>"],
//             ["<blockquote>", "<n-blockquote>"],
//             ["</blockquote>", "</n-blockquote>"],
//             ["<img", "<n-image"],
//             ["<a", "<n-a"],
//             ["</a>", `&nbsp;<n-icon style="top:1px;"><ExternalLinkAlt/></n-icon></n-a>`],
//             ["<ol>", "<n-ol>"],
//             ["</ol>", "</n-ol>"],
//             ["<ul", "<n-ul "],
//             ["</ul>", "</n-ul>"],
//             ["<li", "<n-li "],
//             ["</li>", "</n-li>"],
//             ["<mark", `<n-text tag="mark" type="warning"`],
//             ["</mark>", "</n-text>"]
//             // [
//             //   `<input class="task-list-item-checkbox" checked="" disabled="" type="checkbox">`,
//             //   `<n-checkbox :checked="true" style="cursor: auto;"></n-checkbox>`
//             // ],
//             // [
//             //   `<input class="task-list-item-checkbox" disabled="" type="checkbox">`,
//             //   `<n-checkbox :checked="false" style="cursor: auto;"></n-checkbox>`
//             // ]
//           ]
//           for (const [s, t] of keywordPool) {
//             result = result.replace(new RegExp(s, "g"), t)
//           }
          
//           // const [ tem, s ] = result.split(`</template>`)
//           // result = tem + `<n-divider title-placement="left">到底了</n-divider>` +`</template>`+ s + markdownScripts
//           result = result.slice(0, -6) + `<n-divider title-placement="left">到底了</n-divider></div>`
//           result += markdownScripts;
//           // console.log(result)
//           return result
//         }
//       },
//       markdownItOptions: {
//         xhtmlOut: true,
//         highlight
//       },
//       markdownItSetup(md) {
//         md.use(preWrapperPlugin)
//           .use(linkPlugin, {
//             target: '_blank',
//             rel: 'noopener noreferrer'
//           })
//           .use(highlightLinePlugin)
//           .use(lineNumberPlugin)
//           .use(deflistPlugin)
//           .use(attrsPlugin)
//           .use(markPlugin)
//           .use(taskListPlugin)
//       },
//     }),
//   ],
//   server: {
//     host: "0.0.0.0",
//     port: 9000
//   },
//   build: {
//     outDir: process.env.MODE === "SSG" ? "../../dist/static" : "../../dist",
//     // minify: false,
//   },
//   ssgOptions: {
//     mock: true,
//     // format: 'cjs'
//   },
//   resolve: {
//     // 别名
//     alias: {
//       "@": resolve(__dirname, "./src/client"),
//       "%": resolve(__dirname, "./drafts"),
//     },
//   },
// }
)
