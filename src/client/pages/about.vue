<script lang="ts" setup>
import type { Store, UpdateMeta } from "../../../interface";
import { NA, NH2, NH3, NUl, NLi,NIcon, NP } from "naive-ui";
import RemoteLogo from "@/components/RemoteLogo.vue";
import { inject } from "vue";
import { GithubFilled as GithubIcon } from "@vicons/antd"
const store = inject("custoStore") as Store;
const updateMeta = inject("updateMeta") as UpdateMeta;
updateMeta({ title: "关于本站" });
</script>
<template>
  <div class="about">
    <n-h2>关于本站</n-h2>
    <div>
      <n-h3>源码地址</n-h3>
      <n-p style="display: flex; align-items: flex-start;">
        <NIcon size="16" :color="store.theme==='dark'?'#ffffff':'#000000'" style="margin-top:3px" >
          <GithubIcon/>
        </NIcon>
        &nbsp;
        <n-a href="https://github.com/AshenBird/mcswift.me" target="_blank">https://github.com/AshenBird/mcswift.me</n-a>  
      </n-p>
      <n-h3>技术栈</n-h3>
      <n-ul>
        <n-li>
          <remote-logo src="https://vuejs.org/images/logo.png" />&nbsp;
          <n-a href="https://v3.cn.vuejs.org/" target="_blank"> Vue 3 </n-a>
        </n-li>
        <n-li>
          <remote-logo
            src="https://naiveui.oss-cn-hongkong.aliyuncs.com/naivelogo.svg"
          />&nbsp;
          <n-a href="https://www.naiveui.com/" target="_blank"> Naive UI </n-a>
        </n-li>
        <n-li>
          <remote-logo
            src="/xicons.svg"
          />&nbsp;
          <n-a href="https://www.xicons.org/" target="_blank"> xicons </n-a>
        </n-li>
        <n-li>
          <remote-logo src="https://vitejs.dev/logo.svg" />&nbsp;
          <n-a href="https://cn.vitejs.dev/" target="_blank"> Vite </n-a>
        </n-li>
        <n-li>
          <remote-logo src="https://vitejs.dev/logo.svg" />&nbsp;
          <n-a href="https://github.com/antfu/vite-plugin-md" target="_blank">
            vite-plugin-md
          </n-a>
        </n-li>
        <n-li>
          <remote-logo src="https://vitejs.dev/logo.svg" />&nbsp;
          <n-a href="https://github.com/antfu/vite-ssg" target="_blank">
            vite-ssg
          </n-a>
        </n-li>
      </n-ul>
    </div>
    <div style="margin-top: 40px">
      <n-h3>部署方案</n-h3>
      <n-ul>
        <n-li>
          <n-a href="https://www.cloudflare.com/zh-cn/cdn/" target="_blank">
            Cloudflare CDN
          </n-a>
        </n-li>
        <n-li>
          <n-a href="https://www.cloudflare.com/zh-cn/dns/" target="_blank">
            Cloudflare DNS
          </n-a>
        </n-li>
      </n-ul>
    </div>
    <div style="margin-top: 40px">
      <n-h3>曾使用</n-h3>
      <n-ul>
        <n-li>
          <n-a href="https://workers.cloudflare.com/" target="_blank">
            Cloudflare Workers
          </n-a>
        </n-li>
        <n-li>
          <n-a href="https://v3.nuxtjs.org/" target="_blank"> Nuxt 3 </n-a>
        </n-li>
      </n-ul>
    </div>
  </div>
</template>
<style lang="css" scoped>
.about{
  padding-bottom: 30px;
}
@media (min-width: 1200px) {
  .about{
    margin-left: calc( 50vw - 600px - 15px); 
  }
}
</style>
