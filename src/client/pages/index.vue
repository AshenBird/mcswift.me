<script setup lang="ts">
import type {Store} from "../../../interface"

import { NSpace, NA, NIcon } from "naive-ui"
import { NTooltip } from "naive-ui"

import { ZhihuCircleFilled as ZhihuIcon, GithubFilled as GithubIcon } from "@vicons/antd"
import { inject } from "vue"

const store = inject("custoStore") as Store
store.title = "首页"

</script>

<template>
  <div class="home-container">
    <nav class="home-nav">
      <NSpace justify="center" align="center">
        <router-link class="home-nav-item"  to="/blog">
          <NA class="home-nav-item" href="javascript:void(0);" >博客</NA>
        </router-link>
        <div class="home-nav-divider"></div>
        <NTooltip trigger="click">
          <template #trigger>
            <NA class="home-nav-item" href="javascript:void(0);" >作品</NA>
          </template>
          <span>施工中...</span>
        </NTooltip>
        <div class="home-nav-divider"></div>
          <router-link
            to="/connect"
            #="{ navigate, href }"
            custom
          >
            <NA class="mcswift-link" :href="href" @click="navigate">
              联系我
            </NA>
          </router-link>
        <div class="home-nav-divider"></div>
        <router-link class="home-nav-item"  to="/about">
          <NA class="home-nav-item" href="javascript:void(0);" >关于本站</NA>
        </router-link>
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
</template>
<style>
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
  align-self: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: calc(100vh - 80px);
}
.social-media-nav-item, .home-nav-item{
  text-decoration: none;
}
</style>
