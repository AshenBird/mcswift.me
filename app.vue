<script setup lang="ts">
// import "normalize.css"
import { NConfigProvider,NGlobalStyle } from 'naive-ui'
// theme
import { useOsTheme, darkTheme } from 'naive-ui'
// locale & dateLocale
import { zhCN, dateZhCN } from 'naive-ui'

const store = reactive({
  theme:""
})


const isDark = computed(()=>store.theme === "dark")

const theme = computed(()=>store.theme==="dark"?darkTheme:undefined)

onMounted(()=>{
  store.theme = useOsTheme().value
})

provide("store",store)

</script>

<template>
  <div>
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
