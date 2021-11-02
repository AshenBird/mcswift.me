export default ()=>[
  {
    path:"other",
    meta:{
      title:"其他",
    },
    children:[
      {
        path:"shopping",
        meta:{
          title:"消费主义时代谁没点恋物癖——好物推荐",
        },
        component:()=>import("./shopping.md")
      }
    ],
  },
]