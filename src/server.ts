import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import "./db.js";
import authRouter from "./routers/authRouter.js";

dotenv.config();

const app = express();
const PORT = 4000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`✅ Server ready at: http://localhost:${PORT}`);
});
