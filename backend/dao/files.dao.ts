import prisma from "../config/prisma";

const filesDao = {
  createFile: async (file: { name: string; size: number; userId: number }) => {
    return prisma.file.create({
      data: {
        name: file.name,
        size: file.size,
        userId: file.userId,
      },
    });
  },

  listUserFiles: async (userId: number) => {
    return prisma.file.findMany({
      where: {
        userId,
      },
    });
  },

  getFile: async (fileName: string) => {
    return prisma.file.findUnique({
      where: {
        name: fileName,
      },
      include: {
        user: true,
      },
    });
  },

  incrementViews: async (fileId: number) => {
    return prisma.file.update({
      where: {
        id: fileId,
      },
      data: {
        totalViews: {
          increment: 1,
        },
      },
    });
  },
};

export default filesDao;
