import { Router } from "express";
import * as categoryController from './category.controller.js';
import fileUpload, { fileValidation } from "../../services/multer.js";
const router = Router();

router.get('/', categoryController.getCategories);
router.post('/', fileUpload(fileValidation.image).single('image'), categoryController.createCategory);

export default router;