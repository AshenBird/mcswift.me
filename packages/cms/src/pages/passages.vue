<script setup lang="tsx">
import { Passage } from ".prisma/client";
import { ref, VNode } from "vue";
import { getAllPassage, updatePassage } from "../api/passages";
import { NDataTable, NInput } from "naive-ui";
import TableInput from "../components/TableInput.vue";
import { useRefresh } from "grip.js"
const list = ref<(Omit<Passage, "updatedAt">&{updatedAt:string})[]>([]);
const getList = async () => {
  list.value = await getAllPassage();
};

type PassageColumn = {
  title: string;
  key: keyof Passage;
  render?: (row: Passage) => VNode;
  width?:number
};

const update = async (row, data) => {
  await updatePassage(row.id, data);
  for (const [k, v] of Object.entries(data)) {
    row[k] = v;
  }
};

const columns: PassageColumn[] = [
  {
    title: "ID",
    key: "id",
    width:50
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
    width:300
  },
  {
    title: "最后更新时间",
    key: "updatedAt",
    width:250
  },
  {
    title: "文件名",
    key: "path",
    width:200
  },
];
getList();
useRefresh(
  getList
)
</script>
<template>
  <n-data-table :data="list" :columns="columns"></n-data-table>
</template>
