import { Teacher } from "@prisma/client";
import prisma from "../config/database.js";

export async function find(teacherId: number): Promise<Teacher> {
  const teacher = await prisma.teacher.findUnique({where: {id: teacherId}});
  return teacher;
}

export async function findByTestId(testId: number) {
  const teacher = await prisma.test.findFirst({
    where: {
      id: testId
    },
    select: {
      teacherDiscipline: {
        select: {
          teacher: {
            select: {
              id: true,
              name: true
            }
          }
        }
      }
    }
  });
  return teacher.teacherDiscipline.teacher;
}

export async function findAll() {
  const teachers: any[] = await prisma.teacher.findMany();
  return teachers;
}