import { Api, Post } from "@midwayjs/hooks";
import { Menu, Passage } from "@prisma/client";
import { prisma } from "./prisma";
import * as uuid from "uuid";
import fs from "fs-extra";
import Path from "path";
import normalize from "normalize-path"
interface MenuNode {
  value?: string;
  name: string;
  type: string;
  children?: MenuNode[];
  path: string;
}
export const generate = Api(Post(), async () => {
  const menus = await prisma.menu.findMany();
  const replaceMap = new Map<string, string>();
  const result:MenuNode[] = [];
  const routerPath = `../website/src/client/router`
  const plant = async (l: Menu[]) => {
    const map = new Map<number, MenuNode>();
    for (const { type, value, id, name, path } of l) {
      const item: MenuNode = {
        type,
        name,
        path,
      };
      if (type === "folder") {
        item.children = [];
      }
      if (type === "passage") {
        const key = uuid.v1();
        const { path } = (await prisma.passage.findUnique({
          where: {
            id: Number(value),
          },
        })) as Passage;
        replaceMap.set(
          key,
          `()=>import("${Path.posix.relative(routerPath,`../data/drafts/${path}`)}")`
        );
        item.value = key;
      } else {
        item.value = value;
      }
      map.set(id, item);
    }
    for (const v of l) {
      const item = map.get(v.id) as MenuNode;
      if (v.pid === 0) {
        result.push(item);
        continue;
      }
      const p = map.get(v.pid) as MenuNode;
      (p.children as MenuNode[]).push(item);
    }
    let str = `export default ${JSON.stringify(result, (k, v) => v, 2)}`;
    for (const [key, value] of replaceMap) {
      str = str.replace(`"${key}"`, value);
    }
    return str;
  };
  const tree = await plant(menus);
  fs.writeFileSync(routerPath + `/passage-config.ts`, tree);
  return {
    message: "success",
  };
});
