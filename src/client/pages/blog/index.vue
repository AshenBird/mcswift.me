<script lang="tsx" setup>
import type { Store } from "../../../../interface";
import { inject, watch, ref, VNodeChild, computed } from "vue";
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
  NEllipsis,
  NButton,
} from "naive-ui";
import { useRoute, RouterLink } from "vue-router";
import { BookOutline as BookIcon, Menu as MenuIcon } from "@vicons/ionicons5";
import blogConfigs from "../../../../drafts/config";
import { BlogDirectoryConfig } from "../../../../interface";
import { children } from "../../router/blog";

// 菜单配置


// <NEllipsis
//   v-slots={{
//     default: () => (
//       <RouterLink to={fullPath}>{item.meta.title}</RouterLink>
//     ),
//     tooltip: () => <span>{item.meta.title}</span>,
//   }}
// ></NEllipsis>

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
          <div onClick={() => (drawerActive.value = false)} style="white-space: normal">
            <RouterLink to={fullPath}>{item.meta.title}</RouterLink>
          </div>
        ),
      icon: (): VNodeChild => (
        <NIcon>
          <BookIcon></BookIcon>
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
        目录
      </NText>
    </RouterLink>
  </div>
);

const menuOptions = ref([
  {
    label: rootLink,
  },
  ...configTransformMenu(blogConfigs()),
]);

const flatBlogs = ref(children);

const store = inject("custoStore") as Store;

const route = useRoute();

const current = ref("/blog/");

const viewWidth = ref(window.innerWidth);

const drawerActive = ref(false);

const sideBar = () =>
  viewWidth.value > 800 ? (
    <NMenu
      class="blog-side-nav content-menu"
      collapsed-width={64}
      collapsed-icon-size={22}
      options={menuOptions.value}
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
          options={menuOptions.value}
          value={current.value}
        />
      </NDrawer>
    </>
  );

window.addEventListener("resize", () => {
  viewWidth.value = window.innerWidth;
});

watch(
  () => route?.meta?.title,
  (n) => {
    store.title = `BLOG | ${n || "目录"}`;
  },
  {
    immediate: true,
  }
);

watch(
  () => route.fullPath,
  (n) => {
    current.value = n;
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <div class="blog" id="BlogPage">
    <component :is="sideBar" />
    <div class="article-container">
      <router-view v-slot="{ Component }">
        <component v-if="Component" :is="Component" />
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
      </router-view>
    </div>
  </div>
</template>
<style lang="css" scope>
.blog {
  display: flex;
  width: 100%;
  --nav-width: 300px;
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
.content-menu.n-menu .n-menu-item .n-menu-item-content .n-menu-item-content__icon{
  margin-top: 2px;
}

.blog-side-nav {
  width: var(--nav-width);
}
.article-container {
  box-sizing: border-box;
  padding: 0 50px;
  flex: auto;
  width: calc(100% - var(--nav-width));
  overflow: auto;
  height: calc(
    100vh - var(--default-haeder-height) - var(--default-container-padding) * 2
  );
}
.article-container .markdown-body {
  line-height: 2em;
  width: 100%
}
.article-container .markdown-body img{
  max-width: 100%;
}
.article-container .markdown-body a {
  --text-color: #63e2b7;
  --bezier: cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  transition: color 0.3s var(--bezier), text-decoration-color 0.3s var(--bezier);
  color: var(--text-color);
  text-decoration: none;
}

.article-container .markdown-body p {
  font-size: 16px;
  /* color: rgba(255, 255, 255, 0.78); */
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
  .article-container .markdown-body{
    font-size: 12px;
  }
  
  .article-container .markdown-body h1{
    font-size: 20px;
    line-height: 1.5;
    margin-top: 0;
  }
  .article-container .markdown-body p {
    font-size: 14px;
    /* color: rgba(255, 255, 255, 0.78); */
  }
}
</style>
