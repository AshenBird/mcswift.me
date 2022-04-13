<script lang="tsx" setup>
import type { UpdateMeta } from "../../../../interface";
import { inject, watch, ref, shallowRef, onMounted } from "vue";
import { NIcon, NMenu, MenuOption, NText, NDrawer, NButton } from "naive-ui";
import { useRoute, RouterLink } from "vue-router";
import {
  BookOutline as BookOutlineIcon,
  Book as BookIcon,
  Menu as MenuIcon,
} from "@vicons/ionicons5";
import { ArticleFilled as ArticleIcon } from "@vicons/material";
import blogConfigs from "%/config";
import { BlogDirectoryConfig } from "../../../../interface";

import MArticle from "@/components/Article.vue";
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
      icon: () => {
        if (!item.children) {
          return (
            <NIcon>
              <ArticleIcon />
            </NIcon>
          );
        }
        if (item.children.length > 0) {
          return (
            <NIcon>
              <BookIcon />
            </NIcon>
          );
        }

        return (
          <NIcon>
            <BookOutlineIcon />
          </NIcon>
        );
      },
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
    key: "/blog",
  },
  ...configTransformMenu(blogConfigs()),
];

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
window.addEventListener("resize", () => {
  viewWidth.value = window.innerWidth;
});
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

// meta
const updateMeta = inject("updateMeta") as UpdateMeta;

updateMeta({ title: `BLOG` });

watch(
  () => route,
  (n) => {
    updateMeta({ title: `BLOG | ${n?.meta?.title || "全部文章"}` });
  },
  {
    deep: true,
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
onMounted(() => {
  //@ts-ignore
  articleNavList.value = getTitles();
});
</script>
<template>
  <div class="blog" id="BlogPage">
    <component :is="sideBar" />
    <router-view v-slot="{ Component }">
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
      >
        <m-article
          v-if="Component"
          :component="Component"
          :key="route.path"
        ></m-article>
      </transition>
    </router-view>
  </div>
</template>
<style lang="pcss">
#BlogPage{
  --nav-width: 240px;
  --anchor-width: 290px;
}
@media (max-width: 800px) {
  #BlogPage {
    --nav-width: 30px;
  }
}
</style>
<style lang="pcss" scoped>
.blog {
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  --nav-width: 240px;
  --anchor-width: 290px;
  /* padding-left: 12vw; */
  padding-left: 108px;
  box-sizing: border-box;
}

@media (max-width: 1600px) {
  .blog {
    /* padding-left: 8vw; */
    padding-left: 108px;
  }
}
@media (max-width: 1200px) {
  .blog {
    padding-left: 0;
  }
}
:deep(.content-menu).n-menu .n-menu-item {
  height: unset;
  & .n-menu-item-content {
    height: unset;
    align-items: flex-start;
    padding-top: 10px;
    padding-bottom: 10px;

    & .n-menu-item-content__icon {
      margin-top: 1px;
    }

  }
}

:deep(.blog-side-nav) {
  width: var(--nav-width);
}
</style>
