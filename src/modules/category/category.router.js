import { Router } from "express";
import * as categoryController from './category.controller.js';
import fileUpload, { fileValidation } from "../../services/multer.js";
import subCategoryRouter from './../subcategory/subcategory.router.js';
import auth, { roles } from "../../middleware/auth.js";
import { endPoint } from "./category.endpoint.js";
import { asyncHandler } from "../../services/errorHandling.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "./category.validation.js"
const router = Router();

router.use('/:id/subcategory', subCategoryRouter);
router.post('/', auth(endPoint.create), fileUpload(fileValidation.image).single('image'), validation(validators.createCategorySchema), asyncHandler(categoryController.createCategory));
router.get('/',auth(endPoint.getAll), asyncHandler(categoryController.getCategories));
router.get('/active'/*, auth(Object.values(roles))*/, asyncHandler(categoryController.getActiveCategoies));
router.get('/:id', validation(validators.getSpecificCategorySchema), asyncHandler(categoryController.getSpecificCategory));
router.put('/:id', auth(endPoint.update), fileUpload(fileValidation.image).single('image'), asyncHandler(categoryController.updateCategory));

export default router;