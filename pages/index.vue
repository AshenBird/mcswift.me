<script setup lang="ts">
import { NButton, NSpace, NA } from "naive-ui"
</script>

<template>
  <div class="home-container">
    <n-layout>
    <div></div>
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
    </n-layout>
  </div>
</template>
<style lang="postcss">
.home-nav{
  align-self: center;
  font-size: 16px;
}
.home-nav-divider{
  width: 1px;
  height: 2em;
  background-color: #adadad;
  background-image: linear-gradient(180deg, rgb(255,255,255),rgb(200,200,170),rgb(200,200,170), rgb(255,255,255));
}
.home-container{
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
}
.home-nav-item{
  text-decoration: none;
}
</style>
