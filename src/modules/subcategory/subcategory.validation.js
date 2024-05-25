import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const create = joi.object({
    categoryId: generalFields.id,
    name: joi.string().max(30).required(),
    file: generalFields.file
})

export const get = joi.object({
    id: generalFields.id
});

