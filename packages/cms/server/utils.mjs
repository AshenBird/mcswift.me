export const extendCtx = (
  app, name, mod
)=>{
  Object.defineProperty(app,name,{
    get:()=>mod
  })
}