import { Router } from 'express';
import auth from "../../middleware/auth.js";
import * as orderController from './order.controller.js';
import * as validatores from './order.validation.js';
import { validation } from '../../middleware/validation.js';
import { endPoint } from './order.endpoint.js';
import { asyncHandler } from '../../services/errorHandling.js';
const router = Router();


router.post('/', auth(endPoint.create), validation(validatores.createOrder), asyncHandler(orderController.createOrder));
router.get('/', auth(endPoint.get), asyncHandler(orderController.getOrders));
router.patch('/cancel/:id', auth(endPoint.cancel), validation(validatores.cancelOrder), asyncHandler(orderController.cancelOrder));
router.patch('/changeStatus/:id', auth(endPoint.changeStatus),validation(validatores.changeStatus), asyncHandler(orderController.changeStatus));




export default router;