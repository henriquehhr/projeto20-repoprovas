import { GroupByOptions } from "../controllers/testController.js";
import * as testRepository from "../repositories/testRepository.js";
import * as teacherRepository from "../repositories/teacherRepository.js";
import * as disciplineRepository from "../repositories/disciplineRepository.js";
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";
import * as categaryRepository from "../repositories/categoryRepository.js";

export async function create(test, teacherId: number, disciplineId: number) {
  const teacher = await teacherRepository.find(teacherId);
  if(!teacher)
    throw {type: "Not Found", message: "Teacher Id not found"};
  const disciple = await disciplineRepository.find(disciplineId);
  if(!disciple)
    throw {type: "Not Found", message: "Discipline Id not found"};
  const category = await categaryRepository.find(test.categoryId);
  if(!category)
    throw {type: "Not Found", message: "Category Id not found"};
  const teacherDisciplineId = await teacherDisciplineRepository.findOrCreate(teacherId, disciplineId);
  await testRepository.create({...test, teacherDisciplineId});
}

export async function findAllGroupByOptions(groupBy: GroupByOptions) {
  let tests;
  if(groupBy === "disciplines")
    tests = testRepository.findAllGroupByDisciplines();
  else if(groupBy === "teachers")
    tests = testRepository.findAllGroupByTeachers();
  return tests;
}