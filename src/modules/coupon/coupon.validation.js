import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const createCoupon = joi.object({
    name: joi.string().min(3).max(25).required(),
    amount: joi.number().positive(),
    expireDate: joi.date().greater('now').required(),
});

export const updateCoupon = joi.object({
    id: generalFields.id,
    name: joi.string(),
    amount: joi.number()
})

export const editCoupon = joi.object({
    id: generalFields.id
});

