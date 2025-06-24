import Joi from "joi";

export const createNewsSchema = Joi.object({
    title: Joi.string().required().messages({
        "string.empty": "Заголовок обов'язковий",
    }),
    content: Joi.string().required().messages({
        "string.empty": "Контент обов'язковий",
    }),
    category: Joi.string()
        .valid("general", "promotion", "event")
        .required()
        .messages({
            "any.only": "Невірна категорія",
            "string.empty": "Категорія обов'язкова",
        }),
});
