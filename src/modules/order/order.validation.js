import joi from "joi";
import { generalFields } from "../../middleware/validation.js";

export const createOrder = joi.object({
    couponName: joi.string()
});

export const cancelOrder = joi.object({
    id: generalFields.id,
});

export const changeStatus = joi.object({
    id: generalFields.id,
    status: joi.string().valid('pending', 'cancelled', 'confirmed', 'onWay', 'deliverd').required()
});