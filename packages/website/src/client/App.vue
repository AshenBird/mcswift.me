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
import "animate.css"
// import axios from "axios";
import {useRoute} from "vue-router"

// const START_TIME = Date.now();
// const route = useRoute();

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
// const visitLog = async ()=>{
//   const { data } = await axios.request({
//     url:"https://log.mcswift.me/app",
//     method:"POST",
//     data:{
//       time:Date.now()-START_TIME,
//       entryPoint: route.fullPath,
//     }
//   }).catch(()=>{
//     return { data:false}
//   })
//   if(!data)return;
//   const sessionID = data.id
//   watch(()=>route.fullPath, (n,o)=>{
//     axios.request({
//       url:"https://log.mcswift.me/record",
//       method:"POST",
//       data:{
//         path:n,
//         session:sessionID
//       }
//     })
//   },{
//     immediate:true
//   })
// }

onMounted(async () => {
  isMounted.value = true;
  store.theme = localStorage.getItem("theme") || useOsTheme().value || "light";
  // visitLog();
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

provide("customStore", store);
</script>

<template>
  <div id="app"  style="visibility:hidden;" :style="isMounted?'visibility:visible':''">
    <NConfigProvider
      style="height:100%"
      :theme="theme"
      :locale="zhCN"
      :date-locale="dateZhCN"
      :class="{ '__dark-theme': isDark }"
    >
      <NGlobalStyle/>
      <DefaultLayout>
        <router-view v-slot="{ Component,route }">
          <transition  mode="out-in"
            enter-active-class="animate__animated animate__fadeIn fast-then-faster--animate-duration"
            leave-active-class="animate__animated animate__fadeOut fast-then-faster--animate-duration">
            <component :is="Component"/>
          </transition>
        </router-view>
      </DefaultLayout>
    </NConfigProvider>
  </div>
</template>
<style>
:root {
  --default-haeder-height: 40px;
  --default-container-padding: 15px;
}
.fast-then-faster--animate-duration{
  --animate-duration: 0.3s;
}
html, body, #app {
  height: 100%;
}
</style>
