import joi from 'joi';
import { generalFields } from '../../middleware/validation.js';

export const signup = joi.object({
    userName: joi.string().required(),
    password: joi.string().min(3).max(25).required(),
    email: joi.string().email().required(),
    file: generalFields.file,
});

export const signin = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).max(25).required(),
});

export const confirmEmail = joi.object({
    token: joi.string().required()
});

export const sendCode = joi.object({
    email: joi.string().email().required()
});

export const forgetPassword = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(3).max(25).required(),
    code: joi.string().max(30).required()
});
