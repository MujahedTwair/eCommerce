import { Router } from "express";
import * as subcategoryController from './subcategory.controller.js';
import fileUpload, { fileValidation } from "../../services/multer.js";

const router = Router({ mergeParams: true });

router.post('/', fileUpload(fileValidation.image).single('image'), subcategoryController.createSubCategory);

router.get('/',subcategoryController.getSubCategory)

export default router;