import { Discipline } from "@prisma/client";
import prisma from "../config/database.js";

export async function find(disciplineId: number): Promise<Discipline> {
  const discipline = await prisma.discipline.findUnique({where: {id: disciplineId}});
  return discipline;
}

export async function findByTestId(testId) {
  const discipline = await prisma.teacherDiscipline.findFirst({
    select: {
      discipline: {
        select: {
          id: true,
          name: true
        }
      }
    },
    where: {
      tests: {
        some: {
          id: testId
        }
      }
    }
  });
  return discipline;
}