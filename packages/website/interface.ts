import { UnwrapNestedRefs } from "@vue/reactivity"

export interface Store extends UnwrapNestedRefs<{
  theme: string;
  title: string;
}>{}

// export interface BlogDirectoryConfig {
//   path:string;
//   meta:{
//     title:string;
//   };
//   fullPath?:string;
//   component?: () => Promise<typeof import("*.md")>;
//   children?: BlogDirectoryConfig[];
// }


export interface BlogDirectoryConfig {
  type:string;
  name:string;
  path:string;
  value:string|(() => Promise<typeof import("*.md")>);
  children?: BlogDirectoryConfig[];
}

type _UpdateMeta =  (meta: {
  title?: string;
  description?: string;
}) => void

export interface UpdateMeta extends _UpdateMeta {};
