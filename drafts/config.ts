export default ()=>[
  {
    uid:1,
    path:"app",
    meta:{
      title:"工具推荐",
    },
    component:()=>import("./app.md")
  },
  {
    uid:1,
    path:"shopping",
    meta:{
      title:"好物推荐",
    },
    component:()=>import("./shopping.md")
  }
  // {
  //   path:"other",
  //   meta:{
  //     title:"其他",
  //   },
  //   children:[
  //     {
  //       uid:1,
  //       path:"shopping",
  //       meta:{
  //         title:"消费主义时代——好物推荐",
  //       },
  //       component:()=>import("./shopping.md")
  //     }
  //   ],
  // },
]