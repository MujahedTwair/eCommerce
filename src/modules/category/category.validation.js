import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const createCategorySchema = joi.object({
    name: joi.string().min(3).max(25).required(),
    file: generalFields.file.required(),
    // file: joi.array().items(generalFields.file.required()).required()
});

export const getSpecificCategorySchema = joi.object({
    id: joi.string().length(24).required()
})
