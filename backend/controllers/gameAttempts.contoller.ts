import express from "express";

const gameAttemptsRouter = express.Router();

// gameAttemptsRouter.post(
//   "/",
//   async (
//     req: Request<any, NewGameAttemptRes, NewGameAttemptReq>,
//     res: Response<NewGameAttemptRes, Locals>,
//     next: NextFunction
//   ) => {
//     try {
//       const { userId } = res.locals;
//       const { size } = req.body;
//       const gameAttempt = await gameAttemptsService.createNewGameAttempt(
//         userId,
//         size
//       );

//       res.status(201).send(gameAttempt);
//     } catch (error) {
//       next(error);
//     }
//   }
// );

export default gameAttemptsRouter;
