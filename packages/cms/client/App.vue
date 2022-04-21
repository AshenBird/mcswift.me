<script setup lang="tsx">
import Providers from "./Providers.vue";
import { ref, reactive,computed, provide, unref } from "vue";
import Edit from "./Edit.vue"
import {
  NDataTable,
  NLayout,
  NForm,
  NFormItem,
  NInput,
  NButton,
} from "naive-ui";
import axios from "axios";
import { TableColumn } from "naive-ui/lib/data-table/src/interface";

const http = axios.create({
  baseURL: "http://localhost:3000",
});

const raw = ref<ConfigRaw[]>([]);
// provide("raw", raw)
const map  = new Map();

const list = computed(()=>trans(raw.value))

const rowKey = (row: ConfigShow) => row.fullPath;

const trans = (raw: ConfigRaw[], fPath?:string):ConfigShow[] => {
  const r = [];
  for (const [index, _] of raw.entries()) {
    map.set(_.uid,_)
    //@ts-ignore
    const { uid, path, meta, children, component } = _;
    const fullPath = fPath?`${fPath}/${path}`:`/blog/${path}`
    const item:ConfigShow = {
      uid,
      fullPath,
      title: meta.title,
      description: meta.description,
      component: component || "",
    };
    if (children) {
      item.children = trans(children,fullPath);
    }
    r.push(item);
  }
  return r;
};

http.get("/api/list").then((res) => {
  const { list, keys } = res.data;
  raw.value = list;
});

const editData = ref({
  uid:"",
})
const editVisible = ref(false)
const edit = (row:ConfigShow)=>{
  console.log(row.uid)
  editData.value = unref(map.get(row.uid));
  editVisible.value = true;
}

const columns:TableColumn<ConfigShow>[] = [
  {
    title: "标题",
    key: "title",
  },
  {
    title: "路径",
    key: "fullPath",
  },
  {
    title: "组件",
    key: "component",
  },
  {
    title: "编辑",
    key: "action",
    render:(row, index)=>(<NButton onClick={()=>edit(row)}>
      编辑
    </NButton>)
  },
];
const update = (v:ConfigRaw)=>{
  map.set(v.uid, v)
}
</script>
<template>
  <Providers>
    <n-layout>
      <n-data-table :columns="columns" :data="list" :row-key="rowKey" />
      <Edit mode="modal" v-model:show="editVisible" :value="editData" @update:value="update"></Edit>
    </n-layout>
  </Providers>
</template>
<style></style>
