// import dotenv from "dotenv";
import Koa from "koa";
import router from "./router/index.mjs";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
// dotenv.config();

const app = new Koa();

app
  .use(
    cors({
      origin: "*",
      allowMethods: "*",
      allowHeaders: "*",
    })
  )
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use((ctx) => {
    // console.log(ctx.request);
  })
  .listen(3000);
