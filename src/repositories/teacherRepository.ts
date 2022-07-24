import { Teacher } from "@prisma/client";
import prisma from "../config/database.js";

export async function find(teacherId: number): Promise<Teacher> {
  const teacher = await prisma.teacher.findUnique({where: {id: teacherId}});
  return teacher;
}