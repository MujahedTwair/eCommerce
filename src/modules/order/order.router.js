import { Router } from 'express';
import auth from "../../middleware/auth.js";
import * as orderController from './order.controller.js';
import * as validatores from './order.validation.js';
import { validation } from '../../middleware/validation.js';
import { endPoint } from './order.endpoint.js';
import { asyncHandler } from '../../services/errorHandling.js';
const router = Router();


router.post('/', auth(endPoint.create), asyncHandler(orderController.createOrder));




export default router;