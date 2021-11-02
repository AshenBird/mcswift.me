<script lang="tsx" setup>
import type { Store } from "../../../../interface";
import { inject, watch, ref, VNodeChild } from "vue";
import { NUl, NLi, NA, NH2, NH3, NIcon, NMenu, MenuOption, NText } from "naive-ui";
import { useRoute, RouterLink } from "vue-router";
import { BookOutline as BookIcon } from "@vicons/ionicons5";
import blogConfigs from "../../../../drafts/config";
import { BlogDirectoryConfig } from "../../../../interface";
import { children } from "../../router/blog";

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
          <RouterLink to={fullPath}>{item.meta.title}</RouterLink>
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

const menuOptions = ref([
  {
    label: (): VNodeChild => (
      <RouterLink to="/blog">
        <NText style="font-size: 20px;" type="info" strong>
          目录
        </NText>
      </RouterLink>
    ),
  },
  ...configTransformMenu(blogConfigs()),
]);

const flatBlogs = ref(children);

const store = inject("custoStore") as Store;

const route = useRoute();

const current = ref("/blog/");

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
  <div class="blog">
    <n-menu
      class="blog-side-nav"
      :collapsed-width="64"
      :collapsed-icon-size="22"
      :options="menuOptions"
      :value="current"
    />
    <div class="article-container">
      <router-view v-slot="{ Component, route }">
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
}
.blog-side-nav {
  width: 200px ;
}
.article-container{
  padding: 0 50px;
  width: calc( 100% - 200px);
  box-sizing: border-box;
}
.article-container .markdown-body a{
  --text-color: #63e2b7;
  --bezier: cubic-bezier(.4, 0, .2, 1);
  cursor: pointer;
  transition: color .3s var(--bezier), text-decoration-color .3s var(--bezier);
  color: var(--text-color);
  text-decoration: none;
}
</style>
