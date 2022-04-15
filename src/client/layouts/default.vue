<script setup lang="ts">
import type { Store } from "../../../interface";
import { NLayoutContent, NLayout, NLayoutHeader } from "naive-ui";
import { NButton, NPageHeader, NIcon, NEllipsis } from "naive-ui";
import { inject, watch, ref } from "vue";
import { Moon as DarkIcon, Sunny as LightIcon } from "@vicons/ionicons5";
import { useRoute, useRouter } from "vue-router";

const store = inject("customStore") as Store;
const route = useRoute();
const router = useRouter();

const handleBack = () => router.back();

const toHome = () => router.push("/");

const setTheme = (v: string) => {
  store.theme = v;
};
const historyPosi = ref(1);
watch(()=>route,()=>{
  if(import.meta.env.SSR)return;
  const { state:{back, position}, length} = history
  historyPosi.value = position;
},{immediate:true, deep:true})
</script>

<template>
  <NLayout
    :class="{ 'at-home': historyPosi === 0 }"
    class="default-layout"
    content-style="position:absolute; top:0; bottom:0; left:0; right:0;"
  >
    <NLayoutHeader>
      <div class="default-header-container">
        <n-page-header @back="handleBack" class="default-page-header">
          <template #title>
            <span class="page-title" style="cursor: pointer" @click="toHome">
              McSwift
            </span>
          </template>
          <template #subtitle>
            <NEllipsis class="page-subtitle">
              {{ store.title }}
            </NEllipsis>
          </template>
        </n-page-header>
        <NButton
          v-if="store.theme === 'dark'"
          @click="setTheme('light')"
          size="small"
        >
          <NIcon>
            <LightIcon />
          </NIcon>
        </NButton>
        <NButton v-else size="small" @click="setTheme(`dark`)">
          <NIcon>
            <DarkIcon />
          </NIcon>
        </NButton>
      </div>
    </NLayoutHeader>
    <NLayoutContent style="height: calc(100% - var(--default-haeder-height))">
      <div class="default-container">
        <slot />
      </div>
    </NLayoutContent>
  </NLayout>
</template>
<style>
.default-layout {
  /* min-height: 100vh; */
  min-height: 100%;
  position: relative;
}
.default-header-container {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: var(--default-haeder-height);
  padding: 0 15px;
}
.default-container {
  box-sizing: border-box;
  /* max-height: calc(100% - var(--default-haeder-height)); */
  height: 100%;
  margin: auto;
  padding: var(--default-container-padding);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.at-home .n-page-header__back {
  visibility: hidden;
}

.default-page-header .n-page-header__subtitle {
  width: calc(100vw - 190px);
}
@media (max-width: 800px) {
  .page-title {
    font-size: 16px;
  }
}
</style>
