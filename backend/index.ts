import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import gameAttemptsRouter from "./controllers/gameAttempts.contoller";
import userScoresRouter from "./controllers/userScores.controller";
import userMiddleware from "./middleware/user.middleware";
import { ServerError } from "./utils/serverError";

const app = express();

app.use(express.json());
app.use(cors());

app.use(userMiddleware);

app.use("/api/game_attempts", gameAttemptsRouter);
app.use("/api/leaderboard", userScoresRouter);

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
