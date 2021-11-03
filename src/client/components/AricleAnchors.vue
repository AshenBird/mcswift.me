<script setup lang="ts">
import { PropType, defineProps } from "vue";
import AricleAnchors from "./AricleAnchors.vue";
import { NAnchorLink } from "naive-ui"
interface AricleAnchorsOption {
  level: string;
  title: string;
  href: string;
  children: AricleAnchorsOption[];
}

const props = defineProps({
  options: {
    type: Array as PropType<AricleAnchorsOption[]>,
    required: true,
  },
});

</script>

<template>
  <n-anchor-link
    v-for="item of props.options"
    :key="item.href"
    :title="item.title"
    :href="item.href"
  >
    <AricleAnchors v-if="item.children.length>0" :options="item.children"></AricleAnchors>
  </n-anchor-link>
</template>
