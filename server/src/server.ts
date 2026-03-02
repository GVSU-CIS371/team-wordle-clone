import express from "express"
import cors from "cors"
import * as dotenv from 'dotenv';
dotenv.config();

const app: express.Application = express();
const port: number = parseInt(process.env.PORT || '3001', 10);

app.use(express.json());

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