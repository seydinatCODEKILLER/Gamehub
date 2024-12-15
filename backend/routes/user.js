import express from "express";
import secure from "../middlewares/auth.js";
import { uploadProfileController } from "../controllers/user.js";
import { upload } from "../config/multerConfig.js";

const router = express.Router();

router.post(
  "/upload",
  secure,
  upload.single("avatar"),
  uploadProfileController
);

export default router;
