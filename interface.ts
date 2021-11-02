import { UnwrapNestedRefs } from "@vue/reactivity"

export interface Store extends UnwrapNestedRefs<{
  theme: string;
  title: string;
}>{}