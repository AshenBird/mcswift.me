<script lang="ts" setup>
import {
  NConfigProvider,
  NDialogProvider,
  NMessageProvider,
  NLoadingBarProvider,
  NNotificationProvider,
} from "naive-ui";

import { darkTheme } from "naive-ui";
import { computed } from "vue";
const theme = computed(() => ("dark" === "dark" ? darkTheme : null));
</script>
<template>
  <NConfigProvider :theme="darkTheme">
    <NNotificationProvider>
      <NMessageProvider>
        <NLoadingBarProvider>
          <NDialogProvider>
            <slot></slot>
          </NDialogProvider>
        </NLoadingBarProvider>
      </NMessageProvider>
    </NNotificationProvider>
  </NConfigProvider>
</template>
<style>
</style>