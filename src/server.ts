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

const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(20) UNIQUE NOT NULL,
        password VARCHAR(20) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        )
      `);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log(error);
  }
};

initDB();

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
