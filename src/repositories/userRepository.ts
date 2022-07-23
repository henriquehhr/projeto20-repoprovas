import { User } from "@prisma/client";
import prisma from "../config/database.js";

export type CreateUser = Omit<User, "id">;
export type LoginUser = Omit<User, "id">;

export async function findByEmail(email: string) {
  const user = await prisma.user.findUnique({where: {email}});
  return user;
}

export async function insert(user: CreateUser) {
  await prisma.user.create({data: user});
}

