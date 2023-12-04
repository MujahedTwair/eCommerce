import { Router } from "express";
import * as productController from './product.controller.js'
import fileUpload, { fileValidation } from "../../services/multer.js";
import auth from "../../middleware/auth.js";
import { endPoint } from "./product.endpoint.js";
import { asyncHandler } from "../../services/errorHandling.js";
import { validation } from "../../middleware/validation.js";
import * as validators from './product.validation.js';
const router = Router();

router.get('/', asyncHandler(productController.getProducts));
router.post('/', auth(endPoint.create), fileUpload(fileValidation.image).fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'subImages', maxCount: 4 }
]), validation(validators.createProduct), asyncHandler(productController.createProduct))

export default router;