<script setup lang="ts">
import "normalize.css"
import "@/assets/index.css"
import { NConfigProvider,NGlobalStyle } from 'naive-ui'
// theme
import { useOsTheme, darkTheme } from 'naive-ui'
// locale & dateLocale
import { zhCN, dateZhCN } from 'naive-ui'
import { computed, onMounted, provide, reactive, ref, watch,Ref } from 'vue'
// import { BuiltInGlobalTheme } from 'naive-ui/lib/themes/interface'
import DefaultLayout from "@/layouts/default.vue"
import { useHead,HeadObject } from '@vueuse/head'
const store = reactive({
  theme:"dark",
  title:"",
})

const head:Ref<HeadObject> = ref({
  title:"McSwift",
  meta: [
    {
      name: `description`,
      content: "McSwift 的个人网站",
      property:"og:description"
    },
    {
      name: `title`,
      content: "McSwift",
      property:"og:title"
    },
  ],
})

useHead(head)

watch(()=>store.title,(n)=>{
  head.value.title = `McSwift - ${n}`
  // @ts-ignore
  head.value.meta[1].content = `McSwift - ${n}`
})

// const themeType = useState<string>("theme",()=>"")

const isDark = computed(()=>store.theme === "dark")
const theme = computed(()=>store.theme === "dark"?darkTheme:null)

const isMounted = ref(false)
onMounted(async ()=>{
  isMounted.value=true
  store.theme = localStorage.getItem("theme")||useOsTheme().value||"light"
})

// 监听主题变化并记录
watch(()=>store.theme, (n,o)=>{
  if(n===o)return;
  if(!localStorage)return;
  localStorage.setItem('theme', n);
})
provide("custoStore",store)

</script>

<template>
  <div id="app" >
    <NConfigProvider
      :theme="theme"
      :locale="zhCN"
      :date-locale="dateZhCN"
      :class="{'__dark-theme':isDark}">
      <NGlobalStyle v-if="isMounted" />
      <DefaultLayout>
        <RouterView></RouterView>
      </DefaultLayout>
    </NConfigProvider>
  </div>
</template>
<style>
:root{
  --default-haeder-height: 40px;
  --default-container-padding: 15px;
}
#app {
  transition: all 0.5s;
}

</style>
