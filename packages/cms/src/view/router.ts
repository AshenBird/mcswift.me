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
        name:"EditPassage",
        path:"passages/edit/:id",
        component:()=>import("./pages/editPassage.vue"),
        props:true
      },
      {
        path:"menus",
        component:()=>import("./pages/menu.vue"),
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