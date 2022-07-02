import { Api, Get, useContext, Put, Query, Post, Delete } from '@midwayjs/hooks';
import { prisma } from './prisma';
import * as Path from "path";
import fs from "fs-extra";
import * as uuid from "uuid"
const passagesPath = Path.resolve(process.cwd(), "../data/drafts/");

export const getAllPassage = Api(Get(), async () => {
  const passages = await prisma.passage.findMany()
  return passages.map(({ updatedAt, ...item }) => {
    return {
      updatedAt: updatedAt.toLocaleString(),
      ...item
    }
  });
});
export const getPassageByID = Api(Get(), Query<{ id: string }>(), async () => {
  const { id } = useContext().query
  const passage = await prisma.passage.findUnique({
    where: {
      id: Number(id)
    }
  })
  const content = fs.readFileSync(Path.resolve(passagesPath, passage.path), { encoding: "utf-8" });
  return {
    ...passage,
    content
  }
});

export const updatePassage = Api(Put(), async (id, data) => {
  const { title, content } = data
  if (content) {
    const { path: _path } = await prisma.passage.findUnique({ where: { id } })
    const path = Path.resolve(passagesPath, _path);
    fs.writeFileSync(path, content)
  }
  const passage = await prisma.passage.update({
    where: {
      id
    },
    data: {
      title,
      content
    }
  })
  return {
    message: "success"
  };
});


export const createPassage = Api(Post(), async (data) => {
  const path = Path.resolve(passagesPath, `${uuid.v1()}.md`)
  const { title, content } = data
  fs.writeFileSync(path, content)
  const passage = await prisma.passage.create({
    data: {
      title,
      path:`${uuid.v1()}.md`,
      content
    }
  })
  return {
    message: "success"
  };
});

export const delPassage = Api(Delete(),async (id)=>{
  const { path: _path } = await prisma.passage.findUnique({ where: { id } })
  const path = Path.resolve(passagesPath, _path);
  fs.rmSync(path)
  await prisma.passage.delete({
    where:{
      id
    }
  })
  return {
    message:"success"
  }
})