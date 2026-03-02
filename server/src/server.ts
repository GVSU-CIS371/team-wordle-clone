import express, { Application, Request, Response } from "express"
import cors from "cors"

const app: Application = express();
const port: string | number = process.env.port || 3001;

app.use(express.json());

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(port, () => {
    console.log(`Server is running on localhost:${port}`);
});