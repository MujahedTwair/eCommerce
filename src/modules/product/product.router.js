import { Router } from "express";
import * as productController from './product.controller.js'
const router = Router();

router.get('/', productController.getProducts);

export default router;