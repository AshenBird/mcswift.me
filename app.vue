<script setup lang="ts">
// import "normalize.css"
import { NConfigProvider,NGlobalStyle } from 'naive-ui'
// theme
import { useOsTheme, darkTheme } from 'naive-ui'
// locale & dateLocale
import { zhCN, dateZhCN } from 'naive-ui'

const store = reactive({
  theme:"",
  title:"",
})

const isDark = computed(()=>store.theme === "dark")

const theme = computed(()=>store.theme==="dark"?darkTheme:undefined)

onMounted(()=>{
  store.theme = localStorage.getItem("theme")||useOsTheme().value
})

// 监听主题变化并记录
watch(()=>store.theme, (n,o)=>{
  if(n===o)return;
  if(!localStorage)return;
  localStorage.setItem('theme', n);
})


provide("store",store)

</script>

<template>
  <div v-cloak>
    <NConfigProvider
      :theme="theme"
      :locale="zhCN"
      :date-locale="dateZhCN"
      :class="{'__dark-theme':isDark}">
      <NGlobalStyle />
      <NuxtPage />
    </NConfigProvider>
  </div>
</template>

<style lang="css">

</style>
