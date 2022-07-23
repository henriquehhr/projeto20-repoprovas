import express, {json} from "express";
import "express-async-errors";
import errorHandler from "./src/middlewares/errorHandler.js";
import router from "./src/routes/index.js"

const app = express();

app.use(json());
app.use(router);
app.use(errorHandler);

export default app;