import VuePlugin from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig, UserConfigExport } from 'vite';
import Markdown from 'vite-plugin-md'
// import { VitePluginNode } from 'vite-plugin-node';
import { resolve } from "path";

// const end = process.env.END as "client"|"server"
// const configDictionary:Record<string,UserConfigExport> = {
//   client:{
//     plugins: [
//       // 讲 markdown 文件用 vue 插件进行构建
//       VuePlugin({
//         include: [/\.vue$/, /\.md$/],
//       }),
//       VueJsx(),
//       Markdown(),
//     ],
//     build: {
//       minify: false,
//     },
//     resolve: {
//       // 别名
//       alias: {
//         "@": resolve(__dirname, "./src"),
//       },
//     },
//   },
//   server:{
//     build: {
//       minify: false,
//     },
//     optimizeDeps:{
//       include: ['vite']
//     },
//     resolve: {
//       // 别名
//       alias: {
//         "@": resolve(__dirname, "./src"),
//       },
//     },
//     // plugins: [
//     //   ...VitePluginNode({
//     //     // Nodejs native Request adapter
//     //     // currently this plugin support 'express', 'nest', 'koa' and 'fastify' out of box,
//     //     // you can also pass a function if you are using other frameworks, see Custom Adapter section
//     //     adapter: 'express',
  
//     //     // tell the plugin where is your project entry
//     //     appPath: resolve(__dirname, './src/server/dev.ts'),
  
//     //     // Optional, default: 'viteNodeApp'
//     //     // the name of named export of you app from the appPath file
//     //     exportName: 'app',
  
//     //     // Optional, default: 'esbuild'
//     //     // The TypeScript compiler you want to use
//     //     // by default this plugin is using vite default ts compiler which is esbuild
//     //     // 'swc' compiler is supported to use as well for frameworks
//     //     // like Nestjs (esbuild dont support 'emitDecoratorMetadata' yet)
//     //     // tsCompiler: 'esbuild'
//     //   })

//     // ]
//   }
// }


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
  },
  resolve: {
    // 别名
    alias: {
      "@": resolve(__dirname, "./src/client"),
    },
  },
})
