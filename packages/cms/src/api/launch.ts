import { prisma } from "./prisma";
import * as chokidar from "chokidar";
import * as Path from "path";
import fs from "fs-extra";

const passagesPath = Path.resolve(__dirname, "../../../data/drafts/");

const addPassageRecord = async (path: string) => {
  const content = fs.readFileSync(Path.resolve(passagesPath,path), { encoding: "utf-8" });
  const r = await prisma.passage.create({
    data: {
      path,
      content
    },
  });
  return r;
};
const delPassageRecord = async (path: string) => {
  const r = await prisma.passage.delete({
    where: {
      path,
    },
  });
  return r;
};

export const checkPassages = async () => {
  const dirArr = fs
    .readdirSync(passagesPath)
    .map((item) =>  item);
  const raw = (await prisma.passage.findMany())
  const records = raw.map((item) => item.path);
  for (const path of dirArr) {
    if (records.includes(path)) continue;
    await addPassageRecord(path);
  }
  for (const path of records) {
    if (dirArr.includes(path)) continue;
    await delPassageRecord(path);
  }
};

checkPassages();

// export const passageChangeWatcher = chokidar
//   .watch(passagesPath, { ignoreInitial: true })
//   .on("add", (path) => addPassageRecord(path))
//   .on("unlink", (path) => delPassageRecord(path));
