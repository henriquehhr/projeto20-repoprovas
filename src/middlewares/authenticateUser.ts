import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function authenticateUser(req: Request, res: Response, next: NextFunction) {

  const validateTokenFormat = req.headers.authorization.slice(0, 7);
  if (validateTokenFormat != "Bearer ") {
    throw {type: "Unprocessable entity", message: "Authorization header in wrong format"}
  }
  const jwtKey = process.env.JWT_SECRET;
  const token = req.headers.authorization.slice(7);
  if (jwt.verify(token, jwtKey)){
    res.locals.user = jwt.decode(token);
    next();
  }
  else throw {type: "Unauthorized", message: "Wrong credentials"};
}