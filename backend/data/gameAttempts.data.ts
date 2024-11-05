import { GameAttempt, GameAttemptStatus } from "@prisma/client";
import prisma from "../config/prisma";

const gameAttemptsData = {
  create: (data: { gameElements: string; userId: string }) => {
    return prisma.gameAttempt.create({
      data: {
        gameElements: data.gameElements,
        userId: data.userId,
        score: 0,
        status: "ON_PROGRESS",
        timeInSeconds: 0,
      },
    });
  },

  getAllByUserId: (userId: string, status?: GameAttemptStatus) => {
    return prisma.gameAttempt.findMany({
      where: {
        userId,
        status,
      },
    });
  },

  update: (
    id: number,
    data: {
      gameElements?: string;
      timeInSeconds?: number;
      status?: GameAttemptStatus;
      score?: number;
    }
  ) => {
    return prisma.gameAttempt.update({
      where: {
        id,
      },
      data,
    });
  },

  getById: (id: number, userId: string) => {
    return prisma.gameAttempt.findUnique({
      where: {
        id,
        userId,
      },
    });
  },
};

export default gameAttemptsData;
