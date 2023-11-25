import { Router } from "express";
import * as cartController from './cart.controller.js';
import auth from "../../middleware/auth.js";
import { endPoints } from "./cart.endpoint.js";

const router = Router();


router.post('/', auth(endPoints.create), cartController.createCart);
router.patch('/removeItem', auth(endPoints.delete), cartController.removeItem);
router.delete('/clear', auth(endPoints.clear), cartController.clear);
router.get('/',auth(endPoints.get),cartController.getCart);

export default router;