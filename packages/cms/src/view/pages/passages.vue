<script setup lang="tsx">
import { Passage } from ".prisma/client";
import { ref, VNode } from "vue";
import { delPassage, getAllPassage, updatePassage } from "../../api/passages";
import { NButton, NDataTable, NSpace } from "naive-ui";
import TableInput from "../components/TableInput.vue";
import { useRefresh } from "grip.js";
import { useRouter } from "vue-router";
const router = useRouter();

const toAdd = () =>{
  router.push({
    name:"EditPassage",
    params: {
      id: "0",
    },
  })};
const list = ref<(Omit<Passage, "updatedAt"> & { updatedAt: string })[]>([]);
const getList = async () => {
  list.value = await getAllPassage();
};

type PassageColumn = {
  title: string;
  key: keyof (Passage & { actions: any });
  render?: (row: Passage) => VNode;
  width?: number;
};

const update = async (row, data) => {
  await updatePassage(row.id, data);
  for (const [k, v] of Object.entries(data)) {
    row[k] = v;
  }
};
const toDetail = (row) =>
  router.push({
    name:"EditPassage",
    params: {
      id: row.id,
    },
  });
const toDelete = async (row) => {
  await delPassage(row.id)
  getList();
}
const columns: PassageColumn[] = [
  {
    title: "ID",
    key: "id",
    width: 50,
  },
  {
    title: "标题",
    key: "title",
    render: (row: Passage) => (
      <TableInput
        value={row.title}
        onUpdate:value={(title) => update(row, { title })}
      ></TableInput>
    ),
    width: 300,
  },
  {
    title: "最后更新时间",
    key: "updatedAt",
    width: 250,
  },
  {
    title: "文件名",
    key: "path",
    width: 200,
  },
  {
    title: "",
    key: "actions",
    render: (row: Passage) => (
      <NSpace >
        <NButton onClick={() => toDetail(row)}>编辑</NButton>
        <NButton onClick={() => toDelete(row)}>删除</NButton>
      </NSpace>
    ),
  },
];
getList();
useRefresh(getList);
</script>
<template>
<div>
  <div>
    <n-button @click="toAdd">添加</n-button>
  </div>
  <n-data-table :data="list" :columns="columns"></n-data-table>
  </div>
</template>
