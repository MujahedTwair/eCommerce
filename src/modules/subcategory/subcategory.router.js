import { Router } from "express";
import * as subcategoryController from './subcategory.controller.js';
import fileUpload, { fileValidation } from "../../services/multer.js";
import { asyncHandler } from "../../services/errorHandling.js";
import auth from "../../middleware/auth.js";
import { endPoints } from "./subcategory.endpoint.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "./subcategory.validation.js";
const router = Router({ mergeParams: true });

router.post('/', auth(endPoints.create),
    fileUpload(fileValidation.image).single('image'),
    validation(validators.create),
    asyncHandler(subcategoryController.createSubCategory));

router.get('/', validation(validators.get), asyncHandler(subcategoryController.getSubCategory))

export default router;