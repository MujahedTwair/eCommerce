import { Router } from "express";
const router = Router();
import * as authController from './auth.controller.js'
import fileUpload, { fileValidation } from "../../services/multer.js";
import { asyncHandler } from "../../services/errorHandling.js";
import { validation } from "../../middleware/validation.js";
import * as validators from './auth.validation.js'

router.post('/signup', fileUpload(fileValidation.image).single('profilePicture'), validation(validators.signup), asyncHandler(authController.signUp));
router.post('/signin', validation(validators.signin), asyncHandler(authController.signin));
router.get('/confirmEmail/:token', validation(validators.confirmEmail), asyncHandler(authController.confirmEmail));
router.patch('/sendCode', validation(validators.sendCode), asyncHandler(authController.sendCode));
router.patch('/forgetPassword', validation(validators.forgetPassword), asyncHandler(authController.forgetPassword));
router.delete('/deleteInvalidConfirm', asyncHandler(authController.deleteInvalidConfirm))


export default router;