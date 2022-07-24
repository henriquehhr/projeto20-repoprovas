import { Discipline } from "@prisma/client";
import prisma from "../config/database.js";

export async function find(disciplineId: number): Promise<Discipline> {
  const discipline = await prisma.discipline.findUnique({where: {id: disciplineId}});
  return discipline;
}