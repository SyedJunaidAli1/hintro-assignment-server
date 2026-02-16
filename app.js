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
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.js";
import boardRoutes from "./routes/board.routes.js";

app.use("/api/boards", boardRoutes);
app.use(errorHandler);
app.use("/api/auth", authRoutes);

export default app;
