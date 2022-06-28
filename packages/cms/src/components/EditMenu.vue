<script setup lang="tsx">
import { Menu, Passage } from ".prisma/client";
import { computed } from "@vue/reactivity";
import {
  NButton,
  NForm,
  NFormItem,
  NInput,
  NModal,
  NRadio,
  NRadioGroup,
  NSelect,
  NSpace
} from "naive-ui";
import { ref, PropType } from "vue";
import { addMenu, getMenuById, updateMenu } from "../api/menu";
import { getAllPassage } from "../api/passages";

const emit = defineEmits({
  success: null,
});
const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
  options: {
    type: Array as PropType<{ label: string; value: number }[]>,
  },
});

/** 模态框控制 **/

const showModal = ref(false);
const form = ref({
  id: 0,
  name: "",
  pid: 0,
  value: "",
  type: "folder",
  path:"",
});

const show = () => {
  init();
  showModal.value = true;
};

/** 文章信息控制 **/
const passages = ref<(Omit<Passage, "updatedAt"> & { updatedAt: string })[]>(
  []
);

const passageOptions = computed(() =>
  passages.value.map((item) => ({
    label: item.title || item.path, //()=>(<NEllipsis>{`${item.title}(${item.path})`}</NEllipsis>),
    value: item.id.toString(),
  }))
);

const getPassages = async () => {
  passages.value = await getAllPassage();
};

const getMenu = async () => {
  const data = await getMenuById({
    query: {
      id: props.id.toString(),
    },
  });
  const { name, pid, id, value, type, path } = data;
  form.value = {
    name,
    pid,
    id,
    value,
    type,
    path
  };
};

/** 表单控制 **/
const submit = async () => {
  const { id, ...payload } = form.value;
  if (id === 0) {
    await addMenu(payload);
  } else {
    await updateMenu(id, payload);
  }
  showModal.value = false;
  form.value = {
    name: "",
    pid: 0,
    id: 0,
    value: "",
    type: "folder",
    path:""
  };
  emit("success");
};
const rules = computed(() => {
  return {
    name: [
      {
        required: true,
      },
    ],
    pid: [
      {
        required: true,
      },
    ],
  };
});

const typeOptions = ref([
  {
    label: "目录",
    value: "folder",
  },
  {
    label: "文章",
    value: "passage",
  },
  {
    label: "链接",
    value: "link",
  },
]);

const valueLabel = computed(() => ({
  passage: "文章",
  link:"链接"
}[form.value.type]));

const updatePassage = (v)=>{
  const p = passageOptions.value.find(({value})=>value===v);
  form.value.name = p.label;
  form.value.value = v
}

/** 初始化控制 **/
const init = () => {
  getPassages();
  if (props.id !== 0) {
    getMenu();
  }
};
</script>
<template>
  <n-button @click="show"
    >{{ id === 0 ? "添加菜单" : "编辑菜单" }}
    <n-modal
      :mask-closable="false"
      style="width: 800px"
      v-model:show="showModal"
      preset="dialog"
      :title="id === 0 ? '添加菜单' : '编辑菜单'"
    >
      <n-form :model="form" :rules="rules">
        <n-form-item label="名称" path="name">
          <n-input v-model:value="form.name"></n-input>
        </n-form-item>
        <n-form-item label="父菜单" path="pid">
          <n-select
            v-model:value="form.pid"
            filterable
            placeholder="选择父菜单"
            :options="options"
          />
        </n-form-item>
        <n-form-item label="路径">
          <n-input v-model:value="form.path"></n-input>
        </n-form-item>
        <n-form-item label="菜单类型">
          <n-radio-group v-model:value="form.type">
            <n-space>
              <n-radio v-for="item in typeOptions" :key="item.value" :value="item.value">
                {{ item.label }}
              </n-radio>
            </n-space>
          </n-radio-group>
        </n-form-item>
        <n-form-item v-if="form.type !== 'folder'" :label="valueLabel">
          <n-select
            v-if="form.type === 'passage'"
            :value="form.value"
            @update:value="updatePassage"
            filterable
            placeholder="选择文章"
            :options="passageOptions"
          />
          <n-input
            v-else-if="form.type === 'link'"
            v-model:value="form.value"
            placeholder="输入链接"
          />
        </n-form-item>
      </n-form>
      <template #action>
        <div>
          <n-button @click="submit">确定</n-button>
        </div>
      </template>
    </n-modal>
  </n-button>
</template>
