export default [
  {
    "type": "passage",
    "name": "关于",
    "path": "",
    "value": ()=>import("../../../../data/drafts/Readme.md")
  },
  {
    "type": "folder",
    "name": "不值钱的野心",
    "path": "projects",
    "children": [],
    "value": ""
  },
  {
    "type": "folder",
    "name": "被工具奴役为人",
    "path": "tools",
    "children": [
      {
        "type": "passage",
        "name": "工具推荐",
        "path": "app",
        "value": ()=>import("../../../../data/drafts/app.md")
      }
    ],
    "value": ""
  },
  {
    "type": "folder",
    "name": "知识、方法、思想",
    "path": "knowledge",
    "children": [],
    "value": ""
  },
  {
    "type": "folder",
    "name": "技术文档参考与解读",
    "path": "doc",
    "children": [],
    "value": ""
  },
  {
    "type": "folder",
    "name": "随笔",
    "path": "essay",
    "children": [],
    "value": ""
  },
  {
    "type": "folder",
    "name": "笔记",
    "path": "note",
    "children": [
      {
        "type": "passage",
        "name": "初始化一个 linux 开发环境的记录",
        "path": "note-env",
        "value": ()=>import("../../../../data/drafts/linux-env.md")
      }
    ],
    "value": ""
  },
  {
    "type": "passage",
    "name": "好物推荐",
    "path": "goods",
    "value": ()=>import("../../../../data/drafts/shopping.md")
  }
]