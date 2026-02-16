import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";

const app = express();

app.use(helmet());
app.use(morgan("dev"));

app.use(
  cors({
    origin: process.env.NEXT_PUBLIC_CLIENT,
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.js";
import boardRoutes from "./routes/board.routes.js";
import listRoutes from "./routes/list.routes.js";
import taskRoutes from "./routes/task.routes.js";

app.use("/api/boards", boardRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

export default app;
