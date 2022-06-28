import { Api, Delete, Get, Patch, Post, Put, Query, useContext } from "@midwayjs/hooks";
import { prisma } from "./prisma";

export const getAllCollection = Api(Get(), async () => {
  const collections = await prisma.collection.findMany();
  return collections.map(({ updatedAt, ...item }) => {
    return {
      updatedAt: updatedAt.toLocaleString(),
      ...item,
    };
  });
});

export const getCollectionById = Api(Get(),Query<{
  id:string
}>(), async () => {
  const { id }= useContext().query
  const { updatedAt, ...o } = await prisma.collection.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      passages: {     
        select:{
          id:true
        }
      },
    },
  });
  return {
    updatedAt: updatedAt.toLocaleString(),
    ...o,
  };
});

export const addCollection = Api(Post(), async (data) => {
  const { passages, ...o } = data
  const newOne = await prisma.collection.create({
    data:{
      ...o
    },
  });

  if(passages){
    await prisma.collection.update({
      where:{
        id:newOne.id
      },
      data:{
        passages:passages&&passages.length>0?{
          connect:passages.map(id=>({id}))
        }:undefined
      },
    })
  }
  return {
    message: "success",
  };
});

export const updateCollection = Api(Put(), async (id, data) => {
  const { passages, ...o } = data
  await prisma.collection.update({
    where: {
      id,
    },
    data:{
      passages:passages?{
        connect:passages.map(id=>({id}))
      }:undefined,
      ...o
    },
  });
  return {
    message: "success",
  };
});

export const delCollection = Api(Delete(), async (id) => {
  // 获取要删除的频道的父id数据
  const { pid } = await prisma.collection.findUnique({
    where: {
      id,
    },
  });
  // 修改子频道的 父频道标记
  await prisma.collection.updateMany({
    where: {
      pid: id,
    },
    data: {
      pid,
    },
  });
  // 删除目标
  await prisma.collection.delete({
    where: {
      id,
    },
  });
  return {
    message: "success",
  };
});
