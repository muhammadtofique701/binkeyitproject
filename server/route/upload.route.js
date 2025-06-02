import { Router } from "express";
import auth from "../middleware/auth.js";
import uploadImageController from "../controllers/uploadImages.controller.js";
import upload from "../middleware/multer.js";

const uploadRouter = Router();

uploadRouter.post("/upload",upload.single("image") ,auth,uploadImageController)

export default uploadRouter;