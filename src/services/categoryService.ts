import { Category } from "@prisma/client";

import * as categoriesRepository from "../repositories/categoryRepository.js";

export async function findAll(): Promise<Category[]> {
  const categories = await categoriesRepository.findAll();
  return categories;
}