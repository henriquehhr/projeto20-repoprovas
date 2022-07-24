import { Router } from "express";

import { findAllGroupByOptions, create } from "../controllers/testController.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { newTestSchema } from "../schemas/newTestSchema.js";

const testRouter = Router();

testRouter.post("/tests", authenticateUser, schemaValidator(newTestSchema), create);
testRouter.get("/tests", authenticateUser, findAllGroupByOptions);

export default testRouter;