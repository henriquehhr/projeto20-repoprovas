import { GroupByOptions } from "../controllers/testController.js";
import * as testRepository from "../repositories/testRepository.js";
import * as teacherRepository from "../repositories/teacherRepository.js";
import * as disciplineRepository from "../repositories/disciplineRepository.js";
import * as teacherDisciplineRepository from "../repositories/teacherDisciplineRepository.js";
import * as categaryRepository from "../repositories/categoryRepository.js";
import * as termRepository from "../repositories/termRepository.js";
import { prisma } from "@prisma/client";

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
  if(groupBy === "disciplines"){
    const termsDisciplines = {terms: (await termRepository.findAllWithDisciplines())};
    const categories = await categaryRepository.findAll();
    for(let term of termsDisciplines.terms) {
      for(let discipline of term.disciplines) {
        discipline.categories = structuredClone(categories);
        for(let category of discipline.categories) {
          const tests = await testRepository.findByDisciplineAndCategory(discipline.id, category.id);
          category.tests = structuredClone(tests);
          for(let test of category.tests) {
            test.teacher = await teacherRepository.findByTestId(test.id);
          }
        }
      }
    }
    
    return termsDisciplines;
  }
  else if(groupBy === "teachers"){
    const teachers = {teachers: (await teacherRepository.findAll())};
    const categories = await categaryRepository.findAll();
    for(let teacher of teachers.teachers) {
      teacher.categories = structuredClone(categories);
      for(let category of teacher.categories){
        const tests = await testRepository.findByTeacherAndCategory(teacher.id, category.id);
        category.tests = structuredClone(tests);
        for(let test of category.tests){
          const discipline = await disciplineRepository.findByTestId(test.id);
          //console.log(discipline);
          test.discipline = structuredClone(discipline.discipline);
        }
      }
    }
    return teachers;
  }
}