import { Router } from "express";
const router = Router();
import * as authController from './auth.controller.js'
import fileUpload, { fileValidation } from "../../services/multer.js";

router.post('/signup', fileUpload(fileValidation.image).single('image'), authController.signUp);
router.post('/signin', authController.signin);
export default router;