import { Request, Response } from "express";
//import { CreateTest } from "../repositories/testRepository.js";

import * as testService from "../services/testService.js";

export type GroupByOptions = "teachers" | "disciplines";

export async function create(req: Request, res: Response) {
  const {test, teacherId, disciplineId} = req.body //as CreateTest;
  await testService.create(test, teacherId, disciplineId);
  res.send(201);
}

export async function findAllGroupByOptions(req: Request, res: Response) {
  const groupBy = req.query.groupBy as GroupByOptions;
  const tests = await testService.findAllGroupByOptions(groupBy);
  res.send(tests);
}