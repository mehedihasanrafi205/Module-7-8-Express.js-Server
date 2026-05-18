import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { userRoute } from "./modules/user/user.route";
import { ProfileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import logger from "./middleware/logger";

import CookieParser from "cookie-parser";
import cors from "cors";
import globalErrorHandler from "./middleware/globalErrorHandler";

const app: Application = express();
app.use(CookieParser());

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

app.use(
  cors({
    origin: "http://localhost:3000/",
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server",
    author: "Next Level",
  });
});

app.use("/api/users", userRoute);
app.use("/api/profile", ProfileRoute);
app.use("/api/auth", authRoute);

// Global Error Handling Middleware
app.use(globalErrorHandler);

export default app;
