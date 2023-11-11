import { Router } from "express";
import * as categoryController from './category.controller.js';
import fileUpload, { fileValidation } from "../../services/multer.js";
import subCategoryRouter from './../subcategory/subcategory.router.js';
import auth from "../../middleware/auth.js";
import { endPoint } from "./category.endpoint.js";
const router = Router();

router.use('/:id/subcategory', subCategoryRouter);
router.get('/', auth(endPoint.getAll), categoryController.getCategories);
router.get('/active', auth(endPoint.getActive), categoryController.getActiveCategoies);
router.get('/:id', auth(endPoint.specific), categoryController.getSpecificCategory);
router.post('/', auth(endPoint.create), fileUpload(fileValidation.image).single('image'), categoryController.createCategory);
router.put('/:id', auth(endPoint.update), fileUpload(fileValidation.image).single('image'), categoryController.updateCategory);

export default router;