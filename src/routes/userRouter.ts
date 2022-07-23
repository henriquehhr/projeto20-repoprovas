import { Router } from "express";

import { signin, signup } from "../controllers/userController.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { newUserSchema } from "../schemas/newUserSchema.js";

const userRouter = Router();

userRouter.post("/signup", schemaValidator(newUserSchema), signup);
userRouter.post("/signin", schemaValidator(newUserSchema),signin);

export default userRouter;