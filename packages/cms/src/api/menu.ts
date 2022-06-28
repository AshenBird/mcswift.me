import {
  Api,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  Query,
  useContext,
} from "@midwayjs/hooks";
import { prisma } from "./prisma";

export const getAllMenu = Api(Get(), async () => {
  const menus = await prisma.menu.findMany();
  return menus.map(({ updatedAt, ...item }) => {
    return {
      updatedAt: updatedAt.toLocaleString(),
      ...item,
    };
  });
});

export const getMenuById = Api(
  Get(),
  Query<{
    id: string;
  }>(),
  async () => {
    const { id } = useContext().query;
    const { updatedAt, ...o } = await prisma.menu.findUnique({
      where: {
        id: Number(id),
      },
    });
    return {
      updatedAt: updatedAt.toLocaleString(),
      ...o,
    };
  }
);

export const addMenu = Api(Post(), async (data) => {
  const { value, ...o } = data;
  await prisma.menu.create({
    data: {
      value: value + "",
      ...o,
    },
  });
  return {
    message: "success",
  };
});

export const updateMenu = Api(Put(), async (id, data) => {
  const { value, ...o } = data;
  await prisma.menu.update({
    where: {
      id,
    },
    data: {
      value: value + "",
      ...o,
    },
  });
  return {
    message: "success",
  };
});

export const delMenu = Api(Delete(), async (id) => {
  // 获取要删除的菜单的父id数据
  const { pid } = await prisma.menu.findUnique({
    where: {
      id,
    },
  });
  // 修改子菜单的 父菜单标记
  await prisma.menu.updateMany({
    where: {
      pid: id,
    },
    data: {
      pid,
    },
  });
  // 删除目标
  await prisma.menu.delete({
    where: {
      id,
    },
  });
  return {
    message: "success",
  };
});
