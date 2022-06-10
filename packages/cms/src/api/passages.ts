import { Api, Get, Post, Put } from '@midwayjs/hooks';
import { prisma } from './prisma';

export const getAllPassage = Api(Get(), async () => {
  const passages = await prisma.passage.findMany()
  return passages.map(({updatedAt,...item})=>{
    return {
      updatedAt:updatedAt.toLocaleString(),
      ...item
    }
  });
});

export const updatePassage = Api(Put(), async (id,data) => {
  // const passages = await prisma.passage.findMany()
  const passage = await prisma.passage.update({
    where:{
      id
    },
    data
  })
  return {
    message:"success"
  };
});
