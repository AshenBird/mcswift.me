export default ()=>[
  {
    path:"",
    meta:{
      title:"关于",
    },
    component:()=>import("./Readme.md")
  },
  {
    path:"projects",
    meta:{
      title:"不值钱的野心",
      description:"关于我感兴趣的为他人服务项目的一些想法,比如知识图谱、专业职业信息"
    },
    children:[

    ]
  },
  {
    path:"tools",
    meta:{
      title:"被工具奴役为人",
      description:"工具与工具体系,工具理论,工具选用,通过选择工具构建个人的工具体系实现各种程度的自动化"
    },
    children:[
      {
        path:"app",
        meta:{
          title:"工具推荐",
        },
        component:()=>import("./tools/app.md")
      },
    ]
  },
  {
    path:"knowledge",
    meta:{
      title:"知识、方法、思想",
      description:"关于我积累的各种知识方法和思想，这些其实挺适合作为卡组发布"
    },
    children:[

    ]
  },
  {
    path:"doc",
    meta:{
      title:"技术文档参考与解读",
      description:"有些技术文档写的真的不细致，我们可以增补一下"
    },
    children:[

    ]
  },
  {
    path:"essay",
    meta:{
      title:"随笔",
      description:"就是随笔"
    },
    children:[

    ]
  },
  {
    path:"note",
    meta:{
      title:"笔记",
      description:"记录点东西，方便自己就是"
    },
    children:[
      {
        path:"linux-env",
        meta:{
          title:"初始化一个 linux 开发环境的记录",
        },
        component:()=>import("./note/linux-env.md")
      },
      // {
      //   path:"",
      //   meta:{
      //     title:"",
      //   },
      //   component:()=>import("./note/auth.md")
      // },
    ]
  },
  {
    path:"shopping",
    meta:{
      title:"好物推荐",
    },
    component:()=>import("./shopping.md")
  }
]