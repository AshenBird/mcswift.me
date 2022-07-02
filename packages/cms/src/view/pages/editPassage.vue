<script lang="tsx" setup>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import { computed, onMounted, ref } from "vue";
import { transform } from "../../api/markdown";
import { useLayout } from "../layout";
import * as uuid from "uuid"
import "vitepress/dist/client/theme-default/styles/vars.css";
import "vitepress/dist/client/theme-default/styles/code.css";
import {
  NForm,
  NFormItem,
  NInput,
  NScrollbar,
  NButton,
} from "naive-ui";
import { createPassage, getPassageByID, updatePassage } from "../../api/passages";
import { createPreview } from "../components/createPreview";
import { useRouter } from "vue-router";
const router =useRouter()
//  data
const props = defineProps({
  id: {
    type: String,
    default: "0",
  },
});
const { store } = useLayout()
const passage = ref({
  id: 0,
  path: "",
  content: "",
  title: ""
})

const template = ref('')


// editor
const Editor = ref(null);
let editor: null | monaco.editor.IStandaloneCodeEditor = null

const editorStyle = computed(() => {
  return {
    height: `${store.content.height - 84}px`
  }
})

const onInput = async (content: string) => {
  passage.value.content = content
  const { result } = await transform(content);
  template.value = result
  previewKey.value = uuid.v1()
}

// preview
const scrollStyle = computed(() => {
  return {
    maxHeight: `${store.content.height}px`
  }
})
let Preview = () => {
  const Preview = createPreview(template.value)
  return <Preview></Preview>
}
const previewKey = ref(uuid.v1())

// control
const submit = async () => {
  if (props.id === "0") {
    await createPassage(passage.value);
    return
  }
  // const { content, title } = passage.value
  await updatePassage(Number(props.id), passage.value)
  router.push("/passages")
}

onMounted(async () => {
  const id = props.id
  if (props.id !== "0") {
    passage.value = await getPassageByID({ query: { id } })
    onInput(passage.value.content)
  }
  editor = monaco.editor.create(Editor.value, {
    value: passage.value.content,
    language: "markdown",
    theme: "vs-dark",
    automaticLayout: true,
    wordWrap:"bounded"
  });
  editor.getModel().onDidChangeContent((e) => {
    const content = editor.getValue()
    onInput(content)
  })
});
</script>
<template>
  <div class="passage-edit-view">
    <n-form inline>
      <n-form-item label="标题" style="width:500px">
        <n-input v-model:value="passage.title" placeholder="请输入标题"></n-input>
      </n-form-item>
      <n-form-item>
        <n-button @click="submit">提交</n-button>
      </n-form-item>
    </n-form>
    <div class="content-editor-container" :style="editorStyle">
      <div class="editor-container" ref="Editor" ></div>
      <div class="preview-container">
        <n-scrollbar >
          <component :is="Preview" :key="previewKey"></component>
        </n-scrollbar>
      </div>
    </div>
  </div>
</template>
<style>
.passage-edit-view{
  height: 100%;
}
.content-editor-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.editor-container,
.preview-container {
  width: calc(50% - 10px);
  height: 100%;
}
</style>
<style lang="scss" scoped>
:deep(.n-a) {
  text-decoration: none;
}

@media (max-width: 800px) {
  :deep(div[class*='language-']) {
    margin-right: 8px !important;
    padding-left: 1.1rem;

    & .line-numbers-wrapper {
      width: 1.1rem;
    }
  }

  :deep([class*='language-'] pre) {
    padding: 1.25rem 0.75rem;
  }
}

.n-image-preview-overlay {
  background: rgba(0, 0, 0, 0.8);
}


:deep(div[class*='language-']) {
  margin: 1rem 0;
}

:deep([class*='language-'] code) {
  line-height: calc(0.9135 * var(--code-line-height)) !important;
}

:deep(.markdown-body) {
  /* width: calc(100% - 16px;); */
  padding-right: 16px;

  & img {
    max-width: 100%;
  }

  & mark {
    background: unset;
    background-color: unset;
  }

  & .contains-task-list {
    padding-left: 0;
    padding-inline-start: 0;
    padding-block-start: 0;
  }

  & .task-list-item::marker {
    content: "";
  }

  & li a {
    word-break: break-all;
  }
}
</style>