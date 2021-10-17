<script setup lang="ts">
// import "normalize.css"
import { NConfigProvider,NGlobalStyle } from 'naive-ui'
// theme
import { useOsTheme, darkTheme } from 'naive-ui'
// locale & dateLocale
import { zhCN, dateZhCN } from 'naive-ui'
import { BuiltInGlobalTheme } from 'naive-ui/lib/themes/interface'

const store = reactive({
  theme:"",
  title:"",
})

const theme = useState<string>("theme",()=>"light")

const isDark = computed(()=>theme.value === "dark")
// const theme = computed(()=>theme.value=store.theme === "dark"?darkTheme:undefined)
const isMounted = ref(false)
onMounted(()=>{
  isMounted.value = true
  theme.value = localStorage.getItem("theme")||useOsTheme().value
  // store.theme = localStorage.getItem("theme")||useOsTheme().value
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
  <div  id="app">
    <NConfigProvider
      :theme="theme=== `dark`?darkTheme:null"
      :locale="zhCN"
      :date-locale="dateZhCN"
      :class="{'__dark-theme':isDark}">
      <NGlobalStyle />
      <NuxtPage />
    </NConfigProvider>
  </div>
</template>

