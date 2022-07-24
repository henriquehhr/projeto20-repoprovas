import prisma from "../config/database.js";
import { Test } from "@prisma/client";

export type CreateTest = Omit<Test, "id">;
//TODO fazer validação de esquema de criação de teste
export async function create(test: CreateTest) {
  await prisma.test.create({data: test});
}

export async function findAllGroupByDisciplines() {}

export async function findAllGroupByTeachers() {}
