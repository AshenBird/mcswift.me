import { RouteRecordRaw } from "vue-router";
import config from "../../../drafts/config"
import {BlogDirectoryConfig} from "../../../interface"



// 配置扁平化
const flat = (
  configs: BlogDirectoryConfig[],
  prefix: string = "/blog"
): RouteRecordRaw[] => {
  const result = [] as RouteRecordRaw[];
  for (const item of configs) {
    const fullPath = prefix + "/" + item.path
    if (!item.children) {
      result.push({
        path:fullPath,
        component: item.component as () => Promise<typeof import("*.md")>,
        meta:item.meta
      });
      continue;
    }
    const flatChildren = flat(item.children, fullPath);
    result.push(...flatChildren);
  }
  return result;
};

export const children = flat(config());

export const BlogRoute = {
  path: '/blog',
  component: ()=>import("../pages/blog/index.vue"),
  children,
}