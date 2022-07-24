import prisma from "../config/database.js";
import { TeacherDiscipline } from "@prisma/client";

export type CreateTeacherDiscipline = Omit<TeacherDiscipline, "id">;

export async function findOrCreate(teacherId: number, disciplineId: number) {
  const teacherDiscipline = await prisma.teacherDiscipline.upsert({
    where: {
      teacherId_disciplineId: {teacherId, disciplineId}
    },
    update: {},
    create: {
      teacherId, disciplineId
    }});
  return teacherDiscipline.id;
}