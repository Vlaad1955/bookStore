
import Joi from "joi";

export const createBookSchema = Joi.object({
    title: Joi.string().trim().required().messages({
        "string.empty": "Назва обов’язкова",
    }),

    price: Joi.number().min(0).required().messages({
        "number.base": "Ціна має бути числом",
        "number.min": "Ціна не може бути від’ємною",
        "any.required": "Ціна обов’язкова",
    }),

    description: Joi.string().allow("").optional(),

    author: Joi.string().allow("").optional(),

    gift: Joi.boolean().required(),

    cover: Joi.string().valid("soft", "firm").required(),

    categories: Joi.array()
        .items(Joi.string().uuid({ version: "uuidv4" }))
        .min(1)
        .required()
        .messages({
            "array.min": "Оберіть хоча б одну категорію",
        }),
});
