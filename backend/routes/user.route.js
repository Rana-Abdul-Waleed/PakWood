import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.get("/test", test);
router.put(
  "/updateUser/:userId",
  verifyToken,
  upload.single("profilePicture"),
  updateUser
);

export default router;
