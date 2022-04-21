import Router from "@koa/router";
import fs from "fs-extra";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
const router = new Router();
const DIRNAME = dirname(fileURLToPath(import.meta.url));
const getAbsPath = (p) => resolve(DIRNAME, p);

// const draftsPath = getAbsPath("../../../website/drafts");
const draftsConfigPath = getAbsPath("../../../website/drafts/config.json");
const uidPath = getAbsPath("../../../website/drafts/uid.json");

const transformConfig = (config) => {
  const poll = [];
  const findComponent = (c) => {
    for (const item of c) {
      if (item.component) {
        poll.push(item.component);
      }
      if (item.children) {
        findComponent(item.children);
      }
    }
  };
  findComponent(config);
  const r = JSON.stringify(config).trim();
  for (const p of poll) {
    r.replaceAll(`${p}`, `()=>import"${p}"`);
  }
  return r;
};

router.get("/list", async (ctx, next) => {
  next();
  const raw = fs.readFileSync(draftsConfigPath, { encoding: "utf-8" });
  const uid = fs.readFileSync(draftsConfigPath, { encoding: "utf-8" });
  ctx.body = { list: JSON.parse(raw), keys: JSON.parse(uid) };
});
router.post("/apply", async (ctx, next) => {
  next();
  const {config,keys} = ctx.request.body;
  fs.writeFileSync(draftsConfigPath,JSON.stringify(config))
  fs.writeFileSync(uidPath,JSON.stringify(keys))
  ctx.body = typeof config;
});

export default router;
