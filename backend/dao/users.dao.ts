import prisma from "../config/prisma";

const usersDao = {
  createUser: async (user: { username: string; hashedPassword: string }) => {
    return prisma.user.create({
      data: {
        username: user.username,
        hashedPassword: user.hashedPassword,
      },
    });
  },

  getUserByUsername: async (username: string) => {
    return prisma.user.findUnique({
      where: {
        username,
      },
    });
  },
};

export default usersDao;
