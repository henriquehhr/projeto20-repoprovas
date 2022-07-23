import { Request, Response } from "express";
import * as userService from "../services/userService.js";
import {CreateUser, LoginUser} from "../repositories/userRepository.js";

export async function signup (req: Request, res: Response) {
  const user: CreateUser = req.body;
  await userService.insert(user);
  res.sendStatus(201);
}

export async function signin (req: Request, res: Response) {
  const user: LoginUser = req.body;
  const token = await userService.signin(user);
  res.json({token});
}