import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  addMedia,
  getAllMedia,
  updateMedia,
  deleteMedia,
} from "../controllers/media.controller.js";
import {
  validateAddMedia,
  validateUpdateMedia,
} from "../middlewares/media.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, validateAddMedia, addMedia);

router.get("/", authMiddleware, getAllMedia);

router.patch("/:id", authMiddleware, validateUpdateMedia, updateMedia);

router.delete("/:id", authMiddleware, deleteMedia);

export default router;
