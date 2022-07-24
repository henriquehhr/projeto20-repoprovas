import { Router } from "express";

import { findAllGroupByOptions, create } from "../controllers/testController.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";

const testRouter = Router();

testRouter.post("/tests", authenticateUser, create);
testRouter.get("/tests", authenticateUser, findAllGroupByOptions);

export default testRouter;