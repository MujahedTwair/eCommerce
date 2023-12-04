import { Router } from 'express';
import * as couponController from './coupon.controller.js';
import * as validatores from './coupon.validation.js';
import { validation } from '../../middleware/validation.js';
import { endPoint } from './coupon.endpoint.js';
import auth from '../../middleware/auth.js';
const router = Router();


router.post('/', auth(endPoint.create), validation(validatores.createCoupon), couponController.createCoupon);
router.get('/', couponController.getCoupons);
router.put('/:id', validation(validatores.updateCoupon), couponController.updateCoupon);
router.patch('/softDelete/:id', validation(validatores.editCoupon), couponController.softDelete);
router.delete('/hardDelete/:id', validation(validatores.editCoupon), couponController.hardDelete);
router.patch('/restore/:id', validation(validatores.editCoupon), couponController.restore);



export default router;