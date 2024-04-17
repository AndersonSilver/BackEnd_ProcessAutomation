import express, { json, Request, Response, NextFunction } from "express";
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(json());
app.use(cors());
app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }
  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(PORT, async () => {
  console.info(`⚡️Server is running at http://localhost:${PORT}`);
});
