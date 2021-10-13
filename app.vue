<script setup>
// import "normalize.css"
import { NConfigProvider,NGlobalStyle } from 'naive-ui'
// theme
// import { darkTheme } from 'naive-ui'
// locale & dateLocale
import { zhCN, dateZhCN } from 'naive-ui'

</script>

<template>
  <div>
    <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
      <NGlobalStyle />
      <NuxtPage />
    </NConfigProvider>
  </div>
</template>
