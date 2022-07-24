import { Router } from "express";

import categoryRouter from "./categoryRouter.js";
import testRouter from "./testRouter.js";
import userRouter from "./userRouter.js";

const router = Router();

router.use(userRouter);
router.use(categoryRouter);
router.use(testRouter);

export default router;