import express, { NextFunction, Request, Response } from "express";
import authMiddleware from "../middleware/auth.middleware";
import multer from "multer";
import path from "path";
import filesDao from "../dao/files.dao";
import { ServerError } from "../utils/serverError";
import { homedir } from "os";

const filesRouter = express.Router();

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder where files will be saved
    cb(null, path.join(homedir(), "uploads"));
  },
  filename: function (req, file, cb) {
    // Set the file name for the uploaded file
    cb(
      null,
      file.originalname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize multer with storage configuration
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
  fileFilter: function (req, file, cb) {
    return cb(null, true);
  },
});

filesRouter.post(
  "/upload",
  authMiddleware,
  upload.single("file"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = res.locals;
      const file = req.file;
      const tag = req.body.tag;

      if (!file) {
        throw new ServerError("No file uploaded", 400);
      }

      const isExist = await filesDao.getUserFileByTag(tag, userId);
      if (isExist) {
        throw new ServerError("Tag already exists", 400);
      }

      await filesDao.createFile({
        name: file.filename,
        size: file.size,
        userId: userId,
        tag,
      });

      res.sendStatus(201);
    } catch (error) {
      next(error);
    }
  }
);

filesRouter.get(
  "/list",
  authMiddleware,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId } = res.locals;

      const files = await filesDao.listUserFiles(userId);

      res.json(files);
    } catch (error) {
      next(error);
    }
  }
);

filesRouter.get(
  "/view/:filename",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { filename } = req.params;

      const file = await filesDao.getFile(filename);

      if (!file) {
        throw new ServerError("File not found", 404);
      }

      await filesDao.incrementViews(file.id);

      res.json(file);
    } catch (error) {
      next(error);
    }
  }
);

export default filesRouter;
