<script setup lang="ts">
import { PropType } from "vue";
import { NAnchorLink } from "naive-ui";
// import AricleAnchors from "./AricleAnchors.vue";
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
  prefix: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <n-anchor-link
    v-for="(item, index) of props.options"
    :key="item.href"
    :title="`${props.prefix}${index + 1}${props.prefix ? '' : '.'} ${
      item.title
    }`"
    :href="item.href"
  >
    <aricle-anchors
      v-if="item.children.length > 0"
      :options="item.children"
      :prefix="props.prefix + `${index + 1}.`"
    ></aricle-anchors>
  </n-anchor-link>
</template>
