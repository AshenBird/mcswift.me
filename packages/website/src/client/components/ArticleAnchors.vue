<script setup lang="ts">
import { PropType } from "vue";
import { NAnchorLink } from "naive-ui";
// import ArticleAnchors from "./ArticleAnchors.vue";
interface ArticleAnchorsOption {
  level: string;
  title: string;
  href: string;
  children: ArticleAnchorsOption[];
}

const props = defineProps({
  options: {
    type: Array as PropType<ArticleAnchorsOption[]>,
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
    <article-anchors
      v-if="item.children.length > 0"
      :options="item.children"
      :prefix="props.prefix + `${index + 1}.`"
    ></article-anchors>
  </n-anchor-link>
</template>
