<script setup lang="ts">
import "@/assets/index.css"
// import "normalize.css"
import { NConfigProvider,NGlobalStyle } from 'naive-ui'
// theme
import { useOsTheme, darkTheme } from 'naive-ui'
// locale & dateLocale
import { zhCN, dateZhCN } from 'naive-ui'
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
// import { BuiltInGlobalTheme } from 'naive-ui/lib/themes/interface'
import DefaultLayout from "@/layouts/default.vue"
const store = reactive({
  theme:"dark",
  title:"",
})

watch(()=>store.title,(n)=>{
  if(document){
    document.title = `McSwift - ${n}`
  }
})

// const themeType = useState<string>("theme",()=>"")

const isDark = computed(()=>store.theme === "dark")
const theme = computed(()=>store.theme === "dark"?darkTheme:null)

const isMounted = ref(false)
onMounted(async ()=>{
  isMounted.value=true
  // setTimeout(()=>isMounted.value = true, 500);
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
  <div id="app" >
    <NConfigProvider
      :theme="theme"
      :locale="zhCN"
      :date-locale="dateZhCN"
      :class="{'__dark-theme':isDark}">
      <!-- <client-only> -->
        <NGlobalStyle v-if="isMounted" />
      <!-- </client-only> -->
      <DefaultLayout>
        <RouterView></RouterView>
      </DefaultLayout>
    </NConfigProvider>
  </div>
</template>
<style>
#app {
  transition: all 0.5s;
}

</style>
