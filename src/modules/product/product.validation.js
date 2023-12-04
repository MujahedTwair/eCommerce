import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const createProduct = joi.object({
    name: joi.string().min(3).max(25).required(),
    description: joi.string().min(3).max(150000),
    stock: joi.number().integer().required(),
    price: joi.number().positive().required(),
    discount: joi.number().positive().min(1),
    file: joi.object({
        mainImage: joi.array().items(generalFields.file).length(1).required(),
        subImages: joi.array().items(generalFields.file).min(2).max(4).required()
    }).required(),
    status: joi.string().valid('Active', 'Inactive'),
    categoryId: joi.string().length(24).required(),
    subcategoryId: joi.string().length(24).required(),
    colors: joi.array().items(joi.string().max(10)).max(5),
    sizes: joi.array().items(joi.string().valid('s','m','lg','xlg','xxlg')).max(5)
})