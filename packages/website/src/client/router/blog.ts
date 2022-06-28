import { RouteRecordRaw } from "vue-router";
// import config from "../../../drafts/config"
import {BlogDirectoryConfig} from "../../../interface"
import config from "./passage-config"


// 配置扁平化
const flat = (
  configs: BlogDirectoryConfig[],
  prefix: string = "/blog"
): RouteRecordRaw[] => {
  const result = [] as RouteRecordRaw[];
  for (const item of configs) {
    const fullPath = prefix + "/" + item.path
    if (item.type==="passage") {
      result.push({
        path:fullPath,
        component: item.value as () => Promise<typeof import("*.md")>,
        meta:{
          title:item.name
        }
      });
      continue;
    }
    if(item.children){
      const flatChildren = flat(item.children, fullPath);
      result.push(...flatChildren);
    }
  }
  return result;
};

export const children = flat(config);

export const BlogRoute = {
  path: '/blog',
  component: ()=>import("../pages/blog/index.vue"),
  children,
}