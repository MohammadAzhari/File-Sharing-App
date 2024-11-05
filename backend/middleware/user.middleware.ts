import { Request, Response, NextFunction } from "express";
import { ServerError } from "../utils/serverError";

function userMiddleware(req: Request, res: Response, next: NextFunction) {
  const userId = req.headers.authorization;
  if (!userId) {
    return next(new ServerError("userId header is required", 401));
  }
  res.locals.userId = userId;
  next();
}

export default userMiddleware