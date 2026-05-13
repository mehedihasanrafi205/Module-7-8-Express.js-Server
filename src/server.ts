import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { Pool } from "pg";
const app: Application = express();
const port = 5000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_Emd9sU6qnoRu@ep-misty-cherry-aqwyhnpr-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});

app.get("/user", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server",
    author: "Next Level",
  });
});

app.post("/", async (req: Request, res: Response) => {
  // console.log(req.body);

  const { id, name, price, description } = req.body;
  res.status(201).json({
    message: "Created",
    data: {
      id,
      name,
      description,
      price,
    },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
