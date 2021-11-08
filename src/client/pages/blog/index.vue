<script lang="tsx" setup>
import type { UpdateMeta } from "../../../../interface";
import { inject, watch, ref, shallowRef, onMounted, onUpdated, computed, nextTick } from "vue";
import {
  NUl,
  NLi,
  NA,
  NH2,
  NIcon,
  NMenu,
  MenuOption,
  NText,
  NDrawer,
  NButton,
  NAnchor,
  GlobalThemeOverrides,
  NConfigProvider,
  NScrollbar,
  NBackTop,
} from "naive-ui";
import { useRoute, RouterLink } from "vue-router";
import { BookOutline as BookIcon, Menu as MenuIcon } from "@vicons/ionicons5";
import { ArticleFilled as ArticleIcon } from "@vicons/material";
import blogConfigs from "%/config";
import { BlogDirectoryConfig } from "../../../../interface";
import { children } from "../../router/blog";
import AricleAnchors from "@/components/AricleAnchors.vue";

// import 'highlight.js/styles/github.css';
import "vitepress/dist/client/theme-default/styles/vars.css";
import "vitepress/dist/client/theme-default/styles/code.css";

// const store = inject("custoStore") as Store;
const route = useRoute();

// 菜单配置
const configTransformMenu = (
  configs: BlogDirectoryConfig[],
  prefix: string = "/blog"
): MenuOption[] => {
  const result = [];
  for (const item of configs) {
    const fullPath = prefix + "/" + item.path;
    result.push({
      label: () =>
        item.children ? (
          <span>{item.meta.title}</span>
        ) : (
          <div
            onClick={() => (drawerActive.value = false)}
            style="white-space: normal"
          >
            <RouterLink to={fullPath}>{item.meta.title}</RouterLink>
          </div>
        ),
      icon: () =>
        item.children&&item.children.length>0 ? (
          <NIcon>
            <BookIcon />
          </NIcon>
        ) : (
          <NIcon>
            <ArticleIcon />
          </NIcon>
        ),
      key: fullPath,
      children: item.children
        ? configTransformMenu(item.children, fullPath)
        : undefined,
    });
  }
  return result;
};

const rootLink = () => (
  <div onClick={() => (drawerActive.value = false)}>
    <RouterLink to="/blog">
      <NText
        style={`font-size: ${viewWidth.value > 800 ? 20 : 16}px;`}
        type="info"
        strong
      >
        全部文章
      </NText>
    </RouterLink>
  </div>
);

const menuOptions = [
  {
    label: rootLink,
    key: "/blog"
  },
  ...configTransformMenu(blogConfigs()),
];

// 博客主页目录数据
const flatBlogs = ref(children);

// 目录菜单控制
const drawerActive = ref(false);
const current = ref("/blog/");
watch(
  () => route.path,
  (n) => {
    current.value = n;
  },
  {
    immediate: true,
  }
);

// 屏幕适配逻辑
const viewWidth = ref(window.innerWidth);
const sideBar = () =>
  viewWidth.value > 800 ? (
    <NMenu
      class="blog-side-nav content-menu"
      indent={16}
      collapsed-width={64}
      collapsed-icon-size={22}
      options={menuOptions}
      value={current.value}
    />
  ) : (
    <>
      <NButton
        text
        style="font-size: 24px;"
        class="blog-side-nav"
        onClick={() => (drawerActive.value = !drawerActive.value)}
      >
        <NIcon>
          <MenuIcon />
        </NIcon>
      </NButton>
      <NDrawer
        show={drawerActive.value}
        on-update:show={(v: boolean) => (drawerActive.value = v)}
        width="85vw"
        placement="left"
      >
        <NMenu
          class="content-menu"
          indent={16}
          collapsed-width={64}
          collapsed-icon-size={22}
          options={menuOptions}
          value={current.value}
        />
      </NDrawer>
    </>
  );

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

// meta
const updateMeta = inject("updateMeta") as UpdateMeta;

updateMeta({ title: `BLOG` });

watch(
  () => route,
  (n) => {
    updateMeta({ title: `BLOG | ${n?.meta?.title || "全部文章"}` });
  },
  {
    deep:true,
    immediate: true,
  }
);

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
watch(
  () => route,
  async (n) => {
    await nextTick();
    //@ts-ignore
    articleNavList.value = getTitles();
    // updateMeta({ title: `BLOG | ${n?.meta?.title || "全部文章"}` });
  },
  {
    deep:true,
    immediate: true,
  }
);
</script>
<template>
  <div class="blog" id="BlogPage">
    <component :is="sideBar" />
    <div class="article-container">
      <router-view v-slot="{ Component }">
        <n-scrollbar>
          <template v-if="Component">
            <n-config-provider :theme-overrides="mobileOverrides">
              <component :is="Component" />
            </n-config-provider>
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
                  <NA class="mcswift-link" :href="href" @click="navigate">{{
                    item.meta?.title
                  }}</NA>
                </router-link>
              </n-li>
            </n-ul>
          </div>
          <n-back-top :right="30" />
        </n-scrollbar>
      </router-view>
    </div>
    <n-anchor
      v-if="articleNavList.length > 0 && viewWidth > 1000"
      class="article-anchor"
      show-rail
      ignore-gap
      show-background
      offset-target=".article-container"
    >
      <div style="margin-bottom: 20px">
        <n-text
          :style="`font-size: ${viewWidth > 800 ? 20 : 16}px;margin-left: 14px`"
          type="success"
          strong
          >目录</n-text
        >
      </div>
      <AricleAnchors :options="articleNavList"></AricleAnchors>
    </n-anchor>
  </div>
</template>
<style lang="css" scope>
.blog {
  display: flex;
  width: 100%;
  height: 100%;
  --nav-width: 240px;
  --anchor-width: 290px;
  padding-left: 12vw;
  box-sizing: border-box;
}

@media (max-width: 1600px) {
  .blog {
    padding-left: 8vw;
  }
}
@media (max-width: 1200px) {
  .blog {
    padding-left: 0;
  }
}
.content-menu.n-menu .n-menu-item {
  height: unset;
}

.content-menu.n-menu .n-menu-item .n-menu-item-content {
  height: unset;
  align-items: flex-start;
  padding-top: 10px;
  padding-bottom: 10px;
}
.content-menu.n-menu
  .n-menu-item
  .n-menu-item-content
  .n-menu-item-content__icon {
  margin-top: 2px;
}

.blog-side-nav {
  width: var(--nav-width);
}
.article-container {
  box-sizing: border-box;
  padding: 0 30px;
  padding-right: 0;
  flex: auto;
  width: calc(100% - var(--nav-width) - var(--anchor-width));
  overflow: auto;
  height: 100%;
  /* calc(
    100vh - var(--default-haeder-height) - var(--default-container-padding) * 2
  ); */
}
.n-scrollbar-rail__scrollbar {
  /* background-color: var(--c-brand-light) !important; */
  background-color: var(--text-color) !important;
}
.article-container .markdown-body {
  width: 100%;
}
.article-container .markdown-body img {
  max-width: 100%;
}

.article-container .markdown-body mark {
  background: unset;
  background-color: unset;
}

.article-container .markdown-body .contains-task-list {
  padding-left: 0;
  padding-inline-start: 0;
  padding-block-start: 0;
}

.article-container .markdown-body .task-list-item::marker {
  content: "";
}

.article-anchor {
  width: var(--anchor-width);
}
.article-anchor .n-anchor-rail {

  width: 2px;
}

.n-image-preview-overlay {
  background: rgba(0, 0, 0, 0.8);
}

@media (max-width: 800px) {
  .blog {
    --nav-width: 30px;
  }
  .article-container {
    padding: 0;
  }
  .blog-side-nav {
    height: 30px;
    margin-right: 10px;
  }
}
</style>
