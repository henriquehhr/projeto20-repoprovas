import { Category } from "@prisma/client";
import prisma from "../config/database.js";

export async function findAll(): Promise<Category[]> {
  const categories = await prisma.category.findMany();
  return categories;
}