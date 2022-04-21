<script lang="tsx" setup>
import { NModal, NForm, NFormItem, NInput } from "naive-ui";
import { PropType, computed, onMounted, watch, ref, unref } from "vue";
const props = defineProps({
  mode: {
    type: String as PropType<"modal" | "normal">,
    default: "modal",
  },
  value: {
    type: Object as PropType<Partial<ConfigRaw>>,
  },
  show: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits({
  "update:show":null,
  "update:value":null
})
const Wrap = computed(
  () =>
    ({
      modal: NModal,
      normal: "div",
    }[props.mode])
);
const visibleChange = (v: boolean) => {
  // console.log(v);
  emit("update:show", v)
};

const title = computed(() => {
  if (props.value?.uid) {
    return "编辑";
  }
  // if(props.data?.uid){
  return "添加";
  // }
});

const innerValue = ref(props.value)

watch(()=>props.value, (n)=>{
  innerValue.value = n
})

</script>
<template>
  <component
    :is="Wrap"
    :show="show"
    :title="title"
    size="small"
    style="width:600px"
    preset="card"
    
    @update:show="visibleChange"
  >
    <n-form label-align="right" label-placement="left" label-width="4em">
      <n-form-item label="标题">
        <n-input v-model:value="innerValue.meta.title"></n-input>
      </n-form-item>
      <n-form-item label="路径">
        <n-input v-model:value="innerValue.path"></n-input>
      </n-form-item>
      <n-form-item label="组件">
        <n-input v-model:value="innerValue.component"></n-input>
      </n-form-item>
      <n-form-item label="描述">
        <n-input v-model:value="innerValue.meta.description"></n-input>
      </n-form-item>
    </n-form>
  </component>
</template>
