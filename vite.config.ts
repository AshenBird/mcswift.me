import VuePlugin from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig, UserConfigExport } from 'vite';
import Markdown from 'vite-plugin-md'
import { VitePluginNode } from 'vite-plugin-node';

const end = process.env.END as "client"|"server"

const configDictionary:Record<string,UserConfigExport> = {
  client:{
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
    }
  },
  server:{
    plugins: {
      ...VitePluginNode({
        // Nodejs native Request adapter
        // currently this plugin support 'express', 'nest', 'koa' and 'fastify' out of box,
        // you can also pass a function if you are using other frameworks, see Custom Adapter section
        adapter: 'express',
  
        // tell the plugin where is your project entry
        appPath: './demo.ts',
  
        // Optional, default: 'viteNodeApp'
        // the name of named export of you app from the appPath file
        // exportName: 'viteNodeApp',
  
        // Optional, default: 'esbuild'
        // The TypeScript compiler you want to use
        // by default this plugin is using vite default ts compiler which is esbuild
        // 'swc' compiler is supported to use as well for frameworks
        // like Nestjs (esbuild dont support 'emitDecoratorMetadata' yet)
        // tsCompiler: 'esbuild'
      })
    }
  }
}


export default defineConfig(configDictionary[end])
