<script setup lang="tsx">
import { defineComponent } from 'vue';
import { createLayout, Providers } from "grip.js"
import type { MenuOption } from "naive-ui"
import { NMenu,NButton,NSpace } from "naive-ui"
const { component: Layout } = createLayout();

const createLabel = (text:string)=>()=> (<div>{text}</div>)

const menuOptions:MenuOption[] =[{
  label:createLabel("文章管理"),
  key:"passage"
},{
  label:createLabel("频道管理"),
  key:"channel"
},{
  label:createLabel("标签管理"),
  key:"tag"
}]
</script>

<template>
  <div class="app">
    <Providers>
      <Layout>
        <template #head>
          <n-space>
            <n-button>匹配文章文件</n-button>
            <n-button>生成文章路由</n-button>
            <n-button>发布网站</n-button>
          </n-space>
        </template>
        <template #side>
          <n-menu :options="menuOptions"></n-menu>
        </template>
        <template #default>app</template>
      </Layout>
    </Providers>
  </div>
</template>

<style></style>
