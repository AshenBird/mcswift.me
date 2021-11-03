<script setup lang="ts">
import "normalize.css";
import "@/assets/index.css";
import { NConfigProvider, NGlobalStyle } from "naive-ui";
// theme
import { useOsTheme, darkTheme } from "naive-ui";
// locale & dateLocale
import { zhCN, dateZhCN } from "naive-ui";
import { computed, onMounted, provide, reactive, ref, watch } from "vue";
import DefaultLayout from "@/layouts/default.vue";
import { useHead } from "@vueuse/head";




const metaSource = reactive({
  title:"McSwift",
  image:"/logo.png",
  description:"McSwift 的个人网站",
})

const store = reactive({
  theme: "dark",
  title: "",
});
const head = computed(()=>({
  title:metaSource.title,
  meta: [
    {
      name: `description`,
      content: "McSwift 的个人网站",
      property: "og:description",
    },
    {
      name: `title`,
      content: metaSource.title,
      property: "og:title",
    },
    {
      content: metaSource.image,
      property: "og:image",
    },
  ],
}));

useHead(head);




const updateMeta = (meta: { title: string; description: string, image:string }) => {
  if (meta.title) {
    metaSource.title = `McSwift - ${meta.title}`
    store.title = meta.title
  };
  metaSource.image = meta.image||"/logo.png";
  metaSource.description = meta.description||"McSwift 的个人网站";
};

provide("updateMeta", updateMeta);

const isDark = computed(() => store.theme === "dark");
const theme = computed(() => (store.theme === "dark" ? darkTheme : null));

const isMounted = ref(false);
onMounted(async () => {
  isMounted.value = true;
  store.theme = localStorage.getItem("theme") || useOsTheme().value || "light";
});

// 监听主题变化并记录
watch(
  () => store.theme,
  (n, o) => {
    if (n === o) return;
    if (!localStorage) return;
    localStorage.setItem("theme", n);
  }
);
provide("custoStore", store);
</script>

<template>
  <div id="app">
    <NConfigProvider
      :theme="theme"
      :locale="zhCN"
      :date-locale="dateZhCN"
      :class="{ '__dark-theme': isDark }"
    >
      <NGlobalStyle/>
      <DefaultLayout>
        <RouterView></RouterView>
      </DefaultLayout>
    </NConfigProvider>
  </div>
</template>
<style>
:root {
  --default-haeder-height: 40px;
  --default-container-padding: 15px;
}
#app {
  transition: all 0.5s;
}
</style>
