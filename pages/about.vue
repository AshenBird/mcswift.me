<script lang="ts" setup>
import type {Store} from "../interface"
import { NA, NH2,NH3, NUl, NLi} from "naive-ui"
const store = inject("store") as Store;
store.title = "关于本站"
</script>
<template>
  <div class="about">
    <n-h2>关于本站</n-h2>
    <div>
      <n-h3>技术栈</n-h3>
      <n-ul>
        <n-li>
          <n-a href="https://v3.cn.vuejs.org/" target="_blank">
            Vue 3
          </n-a>
        </n-li>
        <n-li>
          <n-a href="https://v3.nuxtjs.org/" target="_blank">
            Nuxt 3
          </n-a>
        </n-li>
        <n-li>
          <n-a href="https://www.naiveui.com/" target="_blank">
            Naive UI
          </n-a>
        </n-li>
        <n-li>
          <n-a href="https://www.xicons.org/" target="_blank">
            xicons
          </n-a>
        </n-li>
      </n-ul>
    </div>
    <div style="margin-top: 40px">
      <n-h3>部署方案</n-h3>
      <n-ul>
        <n-li>
          <n-a href="https://workers.cloudflare.com/" target="_blank">
            Cloudflare Workers
          </n-a>
        </n-li>
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
  </div>
</template>
<style lang="css">
@media (max-width:1200px) {
  .about{
    padding: 0 20vw;
  }
}

@media (max-width:600px) {
  .about{
    padding: 0 15px;
    /* align-self: center; */
  }
}
</style>