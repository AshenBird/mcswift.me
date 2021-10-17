<script setup lang="ts">
import type { Store } from "../interface"
import { NLayoutContent, NLayout, NLayoutHeader } from "naive-ui"
import { NButton, NPageHeader } from "naive-ui"

const store = inject("store") as Store
const route= useRoute()
const router = useRouter()

const handleBack = ()=>router.back()

const toHome = ()=>router.push('/')

const theme = useState<string>("theme")

const setTheme = (v)=>theme.value=v

</script>

<template>
    <NLayout :class="{'at-home':route.fullPath==='/'}" class="default-layout">
      <NLayoutHeader >
        <div class="default-header-container">
          <n-page-header
            :subtitle="store.title"
            @back="handleBack">
            <template #title>
              <span style="cursor: pointer;" @click="toHome">
                McSwift
              </span>
            </template>
          </n-page-header>
          <NButton v-if="theme === 'dark'" @click="setTheme('light')" size="small">使用亮模式</NButton>
          <NButton v-else size="small" @click="setTheme(`dark`)">使用暗模式</NButton>
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
.default-header-container{
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  padding: 0 15px;
}
.default-container{
  max-width: 1200px;
  margin: auto;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
.at-home .n-page-header__back{
  visibility: collapse;
}
</style>