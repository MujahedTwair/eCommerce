import { Router } from "express";
import * as cartController from './cart.controller.js';
import auth from "../../middleware/auth.js";
import { endPoints } from "./cart.endpoint.js";
import { asyncHandler } from "../../services/errorHandling.js";
import * as validators from "./cart.validation.js";
import { validation } from "../../middleware/validation.js";

const router = Router();


router.post('/', auth(endPoints.create), validation(validators.createCart), asyncHandler(cartController.createCart));
router.patch('/removeItem', auth(endPoints.delete), validation(validators.removeItem), asyncHandler(cartController.removeItem));
router.delete('/clear', auth(endPoints.clear), asyncHandler(cartController.clear));
router.get('/', auth(endPoints.get), asyncHandler(cartController.getCart));

export default router;