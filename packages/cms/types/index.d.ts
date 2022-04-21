
declare interface ConfigRaw{
  uid:string
  path:string
  meta:{
    title:string,
    description?:string
  }
  component?:string
  children?:ConfigRaw[]
}

declare interface ConfigShow{
  uid:string
  fullPath:string
  title:string
  description?:string
  component?:string
  children?:ConfigShow[]
}