<script setup lang="ts">
// import "normalize.css"
import { NConfigProvider,NGlobalStyle } from 'naive-ui'
// theme
import { useOsTheme, darkTheme } from 'naive-ui'
// locale & dateLocale
import { zhCN, dateZhCN } from 'naive-ui'
// import { BuiltInGlobalTheme } from 'naive-ui/lib/themes/interface'

const store = reactive({
  theme:"dark",
  title:"",
})

const themeType = useState<string>("theme",()=>"")

const isDark = computed(()=>store.theme === "dark")
const theme = computed(()=>store.theme === "dark"?darkTheme:null)

const isMounted = ref(false)
onMounted(()=>{
  isMounted.value = true
  
  // theme.value = localStorage.getItem("theme")||useOsTheme().value
  // store.theme = localStorage.getItem("theme")||useOsTheme().value
})

// 监听主题变化并记录
watch(()=>store.theme, (n,o)=>{
  if(n===o)return;
  if(!localStorage)return;
  // console.log( "theme change:",n)
  localStorage.setItem('theme', n);
})
provide("custoStore",store)

</script>

<template>
  <div id="app" :style="isMounted?``:`visibility:hidden;`">
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

