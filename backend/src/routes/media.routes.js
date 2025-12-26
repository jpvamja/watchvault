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

/* ======================
   ADD MEDIA
====================== */
router.post(
  "/",
  authMiddleware,
  validateAddMedia,
  addMedia        // 👈 controller called here
);

/* ======================
   GET ALL MEDIA (FILTERS)
====================== */
router.get(
  "/",
  authMiddleware,
  getAllMedia     // 👈 controller called here
);

/* ======================
   UPDATE MEDIA
====================== */
router.patch(
  "/:id",
  authMiddleware,
  validateUpdateMedia,
  updateMedia     // 👈 controller called here
);

/* ======================
   DELETE MEDIA
====================== */
router.delete(
  "/:id",
  authMiddleware,
  deleteMedia     // 👈 controller called here
);

export default router;
