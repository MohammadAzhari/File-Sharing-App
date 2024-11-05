import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import authRouter from "./controllers/auth.contoller";
import { ServerError } from "./utils/serverError";
import filesRouter from "./controllers/files.controller";
import path from "path";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/files", filesRouter);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  // Check if the error is a known type
  if (err instanceof ServerError) {
    return res.status(err.code).json({ message: err.message });
  }
  // For generic errors, return a 500 status code and a generic error message
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});