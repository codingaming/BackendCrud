import Express from "express";
import Morgan from "morgan";
import { router } from "./routes/index.js";
const app = Express();

app.use(Express.json());
app.use(Morgan('dev'))
app.use('/api',router);


export default app;