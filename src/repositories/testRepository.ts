import prisma from "../config/database.js";
import { Test } from "@prisma/client";

export type CreateTest = Omit<Test, "id">;

export async function create(test: CreateTest) {
  await prisma.test.create({data: test});
}

export async function findAllGroupByDisciplines() {}

export async function findAllGroupByTeachers() {}
