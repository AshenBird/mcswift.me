import * as fs from 'fs'
import * as path  from 'path'
import express from 'express'
import vite from "vite"


// 测试环境判断变量
const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD

const app = express()

// 服务启动函数
async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production'
) {
  const resolve = (p) => path.resolve(__dirname, p)
  app.get('/', (req, res) => {
    res.send('change me to see updates,b express, hmr');
  });
  return app
}
createServer()

app.listen(3000, () => {
  console.log('http://localhost:3000')
})

export const viteNodeApp = app;
