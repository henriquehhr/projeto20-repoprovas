import { Router } from "express";

import { signin, signup } from "../controllers/userController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { newUserSchema } from "../schemas/newUserSchema.js";

const userRouter = Router();

userRouter.post("/sign-up", schemaValidator(newUserSchema), signup);
userRouter.post("/sign-in", schemaValidator(newUserSchema), signin);

export default userRouter;