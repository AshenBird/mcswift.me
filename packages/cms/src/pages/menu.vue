<script setup lang="tsx">
import { Menu } from ".prisma/client";
import { computed, ref, VNode } from "vue";
import { delMenu, getAllMenu, updateMenu } from "../api/menu";
import { NDataTable, NSelect, NButton, NSpace } from "naive-ui";
import TableInput from "../components/TableInput.vue";
import EditMenu from "../components/EditMenu.vue";
import { useRefresh } from "grip.js";

interface MenuItem extends Omit<Menu, "updatedAt"> {
  updatedAt: string;
  children?: MenuItem[];
}

const raw = ref<MenuItem[]>([]);
const list = ref<MenuItem[]>([]);
const options = computed(() => [
  {
    label: "根目录",
    value: 0,
  },
  ...raw.value.filter(item=>item.type==="folder").map(({ name, id }) => ({ label: name, value: id })),
]);
const expandedRowKeys = ref<number[]>([]);

const plant = (l: MenuItem[]) => {
  const map = new Map<number, MenuItem>(
    l.map((item) => {
      item.children = [];
      return [item.id, item];
    })
  );
  const result = [];
  for (const v of l) {
    expandedRowKeys.value.push(v.id);
    if (v.pid === 0) {
      result.push(v);
      continue;
    }
    const p = map.get(v.pid);
    p.children.push(v);
  }
  return result;
};

const getList = async () => {
  const l = await getAllMenu();
  raw.value = l;
  list.value = plant(l);
};

type MenuColumn = {
  title: string;
  key: keyof Menu | "actions";
  render?: (row: Menu) => VNode;
  width?: number;
};

const update = async (row, data) => {
  await updateMenu(row.id, data);
  for (const [k, v] of Object.entries(data)) {
    row[k] = v;
  }
};
const del = async (row) => {
  await delMenu(row.id);
  getList();
};

const getOptions = (row) => {
  const options = [
    {
      label: "根目录",
      value: 0,
    },
  ];
  const filterOptions = (source) => {
    for (const item of source) {
      if (item.id === row.id) continue;
      if (item.type !== "folder") continue;
      options.push({
        label: item.name,
        value: item.id,
      });
      filterOptions(item.children);
    }
  };
  filterOptions(list.value);
  return options;
};

const columns: MenuColumn[] = [
  {
    title: "ID",
    key: "id",
    // width: 100,
  },
  {
    title: "标题",
    key: "name",
    render: (row: Menu) => (
      <TableInput
        value={row.name}
        onUpdate:value={(name) => update(row, { name })}
      ></TableInput>
    ),
    // width: 300,
  },
  {
    title: "最后更新时间",
    key: "updatedAt",
    width: 250,
  },
  {
    title: "父菜单",
    key: "pid",
    width: 200,
    render: (row: Menu) => (
      <NSelect
        value={row.pid}
        filterable
        onUpdateValue={async (pid) => {
          row.pid = pid;
          await update(row, { pid });
          getList();
        }}
        placeholder="选择菜单"
        options={getOptions(row)}
      ></NSelect>
    ),
  },
  {
    title: "",
    key: "actions",
    render: (row: Menu) => (
      <NSpace>
        <NButton onClick={() => del(row)}>删除</NButton>
        <EditMenu
          options={getOptions(row)}
          id={row.id}
          onSuccess={getList}
        ></EditMenu>
      </NSpace>
    ),
    width: 200,
  },
];
getList();
useRefresh(getList);
const rowKey = (row: MenuItem) => row.id;
</script>
<template>
  <edit-menu
    style="margin-bottom: 10px"
    :options="options"
    @success="getList"
    :id="0"
  ></edit-menu>
  <n-data-table
    v-model:expanded-row-keys="expandedRowKeys"
    :data="list"
    :columns="columns"
    :row-key="rowKey"
  ></n-data-table>
</template>
