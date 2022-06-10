import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

export const routes:RouteRecordRaw[]=[
  {
    path:"/",
    redirect:"/passages",
    component:()=>import("./pages/empty.vue"),
    children:[
      {
        path:"passages",
        component:()=>import("./pages/passages.vue"),
      },
      {
        path:"channels",
        component:()=>import("./pages/channels.vue"),
      },
      {
        path:"tags",
        component:()=>import("./pages/tags.vue"),
      }
    ]
  }
]

export const router = createRouter({
  routes,
  history:createWebHistory()
})