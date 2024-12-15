import express from "express";
import { signInController, signUpController } from "../controllers/auth.js";
import { upload } from "../config/multerConfig.js";

const router = express.Router();

router.post("/sign_up", upload.single("avatar"), signUpController);
router.post("/sign_in", signInController);

export default router;
