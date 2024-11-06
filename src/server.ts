import cors from "cors";
import express from "express";
import authRouter from "./routers/authRouter.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);

export default app;
