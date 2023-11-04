import { Router } from "express";
import * as categoryController from './category.controller.js';
import fileUpload, { fileValidation } from "../../services/multer.js";
import subCategoryRouter from './../subcategory/subcategory.router.js';
const router = Router();

router.use('/:id/subcategory', subCategoryRouter);
router.get('/', categoryController.getCategories);
router.get('/active', categoryController.getActiveCategoies);
router.get('/:id', categoryController.getSpecificCategory);
router.post('/', fileUpload(fileValidation.image).single('image'), categoryController.createCategory);
router.put('/:id', fileUpload(fileValidation.image).single('image'), categoryController.updateCategory);

export default router;