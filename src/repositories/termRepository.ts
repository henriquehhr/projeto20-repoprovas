import prisma from "../config/database.js";

export async function findAllWithDisciplines() {
  const terms: any = await prisma.term.findMany({
    include: {
      disciplines: {}
    }
  });
  return terms;
}