<script setup lang="ts">
import type { Store } from "../../../interface";
import { NLayoutContent, NLayout, NLayoutHeader } from "naive-ui";
import { NButton, NPageHeader, NIcon, NEllipsis } from "naive-ui";
import { inject } from "vue";
import { Moon as DarkIcon, Sunny as LightIcon } from "@vicons/ionicons5";
import { useRoute, useRouter } from "vue-router";

const store = inject("custoStore") as Store;
const route = useRoute();
const router = useRouter();

const handleBack = () => router.back();

const toHome = () => router.push("/");

const setTheme = (v: string) => {
  store.theme = v;
};
</script>

<template>
  <NLayout
    :class="{ 'at-home': route.fullPath === '/' }"
    class="default-layout"
  >
    <NLayoutHeader>
      <div class="default-header-container">
        <n-page-header @back="handleBack" class="default-page-header">
          <template #title>
            <span class="page-title" style="cursor: pointer" @click="toHome"> McSwift </span>
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
    <NLayoutContent>
      <div class="default-container">
        <slot />
      </div>
    </NLayoutContent>
  </NLayout>
</template>
<style>
.default-layout {
  min-height: 100vh;
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
  max-width: 1200px;
  box-sizing: border-box;
  max-height: calc(100vh - var(--default-haeder-height));
  margin: auto;
  padding: var(--default-container-padding);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.at-home .n-page-header__back {
  visibility: collapse;
}

.default-page-header .n-page-header__subtitle{
  width: calc( 100vw - 190px );
}
@media (max-width: 800px) {
  .page-title {
    font-size: 16px;
  }
}
</style>
