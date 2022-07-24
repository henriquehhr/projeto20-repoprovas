import joi from "joi";
import { CreateUser } from "../repositories/userRepository.js";

export const newUserSchema = joi.object<CreateUser>({
    email: joi.string().email().required(),
    password: joi.string().required()
});