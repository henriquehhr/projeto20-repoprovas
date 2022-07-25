import prisma from "../config/database.js";
import { Test } from "@prisma/client";

export type CreateTest = Omit<Test, "id">;

export async function create(test: CreateTest) {
  await prisma.test.create({data: test});
}

export async function findByDisciplineAndCategory(disciplineId: number, categoryId: number) {
  const tests: any = await prisma.test.findMany({
    where: {
      AND: [
        {
          categoryId: categoryId
        },
        {
          teacherDiscipline: { disciplineId: disciplineId}
        }
      ]
    }
  });
  return tests;
}

export async function findByTeacherAndCategory(teacherId: number, categoryId: number) {
  const tests = await prisma.test.findMany({
    where: {
      AND: [
        {
          categoryId: categoryId
        },
        {
          teacherDiscipline: { teacherId: teacherId}
        }
      ]
    }
  });
  return tests;
}
