<script setup lang="tsx">
import { ref, watch } from "vue";
import {  Providers } from "grip.js";
import type { MenuOption } from "naive-ui";
import { NMenu, NButton, NSpace } from "naive-ui";
import { RouterView, RouteLocationRaw, RouterLink, useRoute } from "vue-router";
import { generate } from "../api/generate";
import { Layout } from "./layout"

// const createTextLabel = (text: string) => () => <div>{text}</div>;
const createRouterLabel =
  (text: string, to: RouteLocationRaw = "/") =>
  () =>
    <RouterLink to={to}>{text}</RouterLink>;

const active = ref("/passages");
const menuOptions: MenuOption[] = [
  {
    label: createRouterLabel("文章管理", "/passages"),
    key: "/passages",
  },
  {
    label: createRouterLabel("菜单管理","/menus"),
    key: "/menus",
  },
  {
    label: createRouterLabel("标签管理","/tags"),
    key: "/tags",
  },
];

const route = useRoute();

watch(
  () => route.path,
  (n, o) => {
    active.value = n;
  }
);

const gen = async()=>{
  await generate()
}
</script>

<template>
  <div class="app">
    <Providers>
      <Layout>
        <template #head>
          <n-space>
            <n-button @click="gen">生成文章路由</n-button>
            <n-button>发布网站</n-button>
          </n-space>
        </template>
        <template #side>
          <n-menu :options="menuOptions" v-model:value="active"></n-menu>
        </template>
        <template #default>
          <!-- <div> -->
            <router-view></router-view>
          <!-- </div> -->
        </template>
      </Layout>
    </Providers>
  </div>
</template>

<style></style>
