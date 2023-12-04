import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const createCart = joi.object({
    productId: generalFields.id,
    quantity: joi.number().positive().required()
});

export const removeItem = joi.object({
    productId: generalFields.id
});

