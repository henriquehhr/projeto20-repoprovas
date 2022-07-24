import { Router } from "express";

import { findAll } from "../controllers/categoryController.js";
import { authenticateUser } from "../middlewares/authenticateUser.js";

const categoryRouter = Router();

categoryRouter.get("/categories", authenticateUser, findAll);

export default categoryRouter;