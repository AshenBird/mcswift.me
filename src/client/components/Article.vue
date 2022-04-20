<script lang="ts" setup>
import ArticleAnchors from "@/components/ArticleAnchors.vue";
import {
  NUl,
  NLi,
  NA,
  NH2,
  NText,
  NAnchor,
  NConfigProvider,
  NScrollbar,
  NBackTop,
  ScrollbarProps,
} from "naive-ui";
import { children } from "@/router/blog";
import { GlobalThemeOverrides } from "naive-ui";
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  shallowRef,
watch,
} from "vue";
// import { useRoute } from "vue-router";
// import axios from "axios";
import "vitepress/dist/client/theme-default/styles/vars.css";
import "vitepress/dist/client/theme-default/styles/code.css";
const props = defineProps({
  component: {
    type: Object as PropType<ReturnType<typeof defineComponent>>,
  },
});

// 博客主页目录数据
const flatBlogs = ref(children);

// 屏幕适配逻辑
const viewWidth = ref(window.innerWidth);
window.addEventListener("resize", () => {
  viewWidth.value = window.innerWidth;
});
const mobileOverrides = computed<GlobalThemeOverrides>(() => {
  return viewWidth.value > 800
    ? {}
    : {
        Typography: {
          headerFontSize1: "24px",
          headerFontSize2: "20px",
        },
      };
});
type ScrollbarThemeOverrides = NonNullable<ScrollbarProps["themeOverrides"]>;
const scrollProvider: ScrollbarThemeOverrides = {
  color: "rgba(255, 255, 255, 0.5)",
  colorHover: "rgba(255, 255, 255, 0.8)",
};
// 文章导航实现
const articleNavList = shallowRef([]);
const getTitles = () => {
  const flatNodes = [];
  const groupMap = new Map();
  const currentGroup: Record<string, string> = {};
  for (let i = 2; i <= 6; i++) {
    flatNodes.push(...document.querySelectorAll(`.markdown-body h${i}`));
  }
  flatNodes.sort((a, b) => {
    const r = a.compareDocumentPosition(b);
    switch (r) {
      case 2:
        return 1;
      case 4:
        return -1;
    }
    return 0;
  });
  flatNodes.forEach((node, index) => {
    const level = node.nodeName[1];
    const id = `AT${index + 1}`;
    node.id = id;
    currentGroup[level] = id;
    const group = currentGroup[(Number(level) - 1).toString()];

    groupMap.set(id, {
      level,
      title: node.textContent,
      href: `#${id}`,
      children: [],
    });
    if (level === "2") return; // 顶级

    groupMap.get(group).children.push(groupMap.get(id));
  });

  return [...groupMap.values()].filter((item) => item.level === "2");
};
// const route = useRoute()
// watch(()=>route.fullPath, (n,o)=>{
//   if(n.startsWith('/blog')){
//     axios.request({
//       url:"https://log.mcswift.me/aticle/vist",
//       method:"POST",
//       data:{
//         path:n
//       }
//     })
//   }
// },{
//   immediate:true
// })
onMounted(() => {
  //@ts-ignore
  articleNavList.value = getTitles();
});
</script>
<template>
  <div class="article-wrap">
    <div class="article-container">
      <n-scrollbar :theme-overrides="scrollProvider">
        <n-config-provider
          :theme-overrides="mobileOverrides"
          class="markdown-style-provider"
        >
          <template v-if="component">
            <component :is="component" />
          </template>
          <div v-else>
            <n-h2>目录</n-h2>
            <n-ul>
              <n-li v-for="(item, i) of flatBlogs" :key="i">
                <router-link
                  :to="item.path || '/blog'"
                  #="{ navigate, href }"
                  custom
                >
                  <NA class="mcswift-link" :href="href" @click="navigate">
                    {{ item.meta?.title }}
                  </NA>
                </router-link>
              </n-li>
            </n-ul>
          </div>
        </n-config-provider>
        <n-back-top :right="30" :bottom="20" />
      </n-scrollbar>
    </div>
    <template v-if="viewWidth > 1000">
      <n-anchor
        v-if="articleNavList.length > 0"
        class="article-anchor"
        show-rail
        ignore-gap
        show-background
        offset-target=".article-container"
      >
        <!-- <template > -->
        <div style="margin-bottom: 20px">
          <n-text
            :style="`font-size: ${
              viewWidth > 800 ? 20 : 16
            }px;margin-left: 14px`"
            type="success"
            strong
            >目录</n-text
          >
        </div>
        <ArticleAnchors :options="articleNavList"></ArticleAnchors>
        <!-- </template> -->
      </n-anchor>
      <div v-else class="article-anchor-placeholder"></div>
    </template>
  </div>
</template>
<style></style>
<style lang="pcss" scoped>
.article-wrap{
  display: flex;
  width: calc(100% - var(--nav-width));
  height: 100%;
  box-sizing: border-box;
  position: relative;
}
.article-anchor,.article-anchor-placeholder {
  width: var(--anchor-width);
  & .n-anchor-rail {
    width: 2px;
  }
}
:deep(.n-scrollbar) > .n-scrollbar-rail.n-scrollbar-rail--vertical {
    right: 1px;
}
@media (max-width: 800px) {
  .article-container {
    padding: 0;
    height: unset;
    margin-right: -15px;
    margin-top: -15px;
    margin-bottom: -15px;
    & :deep(div[class*='language-']) {
      margin-right: 8px !important;
      padding-left: 1.1rem;
      & .line-numbers-wrapper {
        width: 1.1rem;
      }
    }
    
    & :deep([class*='language-'] pre){
      padding: 1.25rem 0.75rem;
    }
  }
  .markdown-style-provider {
    box-sizing: border-box;
    padding-right: 15px;
    padding-bottom: 50px;
    padding-top: 15px;
  }
  :deep(.blog-side-nav) {
    height: 30px;
    margin-right: 10px;
  }
}

.n-image-preview-overlay {
  background: rgba(0, 0, 0, 0.8);
}

.article-container {
  box-sizing: border-box;
  padding: 0 8px;
  padding-right: 0;
  flex: auto;
  width: calc(100% - var(--nav-width) - var(--anchor-width));
  overflow: auto;
  height: 100%;
  & :deep(div[class*='language-']) {
    margin: 1rem 0;
  }
  & :deep([class*='language-'] code){
    line-height: calc( 0.9135 * var(--code-line-height)) !important;
  }
  & :deep(.markdown-body) {
    /* width: calc(100% - 16px;); */
    padding-right: 16px;
    & img {
      max-width: 100%;
    }
    & mark {
      background: unset;
      background-color: unset;
    }
    & .contains-task-list {
      padding-left: 0;
      padding-inline-start: 0;
      padding-block-start: 0;
    }
    & .task-list-item::marker {
      content: "";
    }
    & li a {
      word-break: break-all;
    }
  }
}

</style>
