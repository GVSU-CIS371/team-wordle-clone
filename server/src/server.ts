import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import wordRouter from "./router/wordRoutes.ts";
import statRouter from "./router/statRoutes.ts";

dotenv.config();

const app: express.Application = express();
const port = process.env.PORT || '3001';

app.use(express.json());

app.use("/word", wordRouter);
app.use("/stat", statRouter)

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.get('/', (req: express.Request, res: express.Response) => {
  res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});