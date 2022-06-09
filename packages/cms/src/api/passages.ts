import { Api, Get } from '@midwayjs/hooks';
import { prisma } from './prisma';

export default Api(Get(), async () => {
  const passages = await prisma.passage.findMany()
  return passages;
});
