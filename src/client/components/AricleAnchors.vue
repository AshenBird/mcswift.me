<script setup lang="ts">
import { PropType } from "vue";
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
  prefix:{
    type: String,
    default: ""
  },
});

</script>

<template>
  <n-anchor-link
    v-for="(item, index ) of props.options"
    :key="item.href"
    :title="`${props.prefix}${index+1}${props.prefix?'':'.'} ${item.title}`"
    :href="item.href"
  >
    <AricleAnchors v-if="item.children.length>0" :options="item.children" :prefix="props.prefix +　`${index+1}.`"></AricleAnchors>
  </n-anchor-link>
</template>
