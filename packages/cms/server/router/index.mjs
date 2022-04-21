import Router from "@koa/router";
import api from "./api.mjs"
const router = new Router();

router.post("/", async (ctx, next) => {
  ctx.body = "Hello World";
});

router.use("/api", api.routes(), api.allowedMethods())

export default router;
