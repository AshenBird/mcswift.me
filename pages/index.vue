<script setup lang="ts">
import type { Store } from "../interface"

import { NSpace, NA, NIcon } from "naive-ui"
import { NLayoutContent, NLayout, NLayoutHeader } from "naive-ui"
// import { NMenu } from "naive-ui"
import { NButton } from "naive-ui"
import { ZhihuCircleFilled as ZhihuIcon, GithubFilled as GithubIcon } from "@vicons/antd"

// const mode = ref("")
const store = inject("store") as Store
</script>

<template>
    <NLayout>
      <NLayoutHeader >
        <div class="home-header-container">
          <NButton v-if="store.theme === 'dark'" @click="()=>{store.theme = ''}" size="small">使用亮模式</NButton>
          <NButton v-else size="small" @click="()=>{store.theme = 'dark'}">使用暗模式</NButton>
        </div>
        <!-- <NMenu></NMenu> -->
      </NLayoutHeader>
      <NLayoutContent>
        <div class="home-container">
          <nav class="home-nav">
            <NSpace justify="center" align="center">
              <NA class="home-nav-item" href="https://blog.mcswift.me" target="_blank">博客</NA>
              <div class="home-nav-divider"></div>
              <NA class="home-nav-item" href="/">作品</NA>
              <div class="home-nav-divider"></div>
              <NA class="home-nav-item" href="/">联系我</NA>
              <div class="home-nav-divider"></div>
              <NA class="home-nav-item" href="/" >关于本网站</NA>
            </NSpace>
          </nav>
          <nav class="social-media-nav">
            <NSpace style="width: 100px;" justify="space-between" align="center">
              <a class="social-media-nav-item" href="https://github.com/AshenBird" target="_blank">
                <NIcon size="28" :color="store.theme==='dark'?'#ffffff':'#000000'">
                  <GithubIcon/>
                </NIcon>
              </a>
              <a class="social-media-nav-item" href="https://www.zhihu.com/people/mcswift-pro" target="_blank">
                <NIcon size="28" color="#0066FF">
                  <ZhihuIcon/>
                </NIcon>
              </a>
            </NSpace>
          </nav>
        </div>
      </NLayoutContent>
    </NLayout>
  <!-- </div> -->
</template>
<style lang="postcss">
.home-header-container{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 40px;
}
.home-nav{
  font-size: 16px;
}
.social-media-nav{
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
.home-nav-divider{
  width: 1px;
  height: 2em;
  background-image: linear-gradient(180deg, rgb(255,255,255),rgb(200,200,170),rgb(200,200,170), rgb(255,255,255));
}

.__dark-theme .home-nav-divider{
  background-image: linear-gradient(180deg, rgb(16,16,20),rgb(100,100,120),rgb(100,100,120), rgb(16,16,20));
}

.home-container{
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 80px);
}
.social-media-nav-item, .home-nav-item{
  text-decoration: none;
}
/* .social-media-nav-item{
  color: #000;
} */
</style>
