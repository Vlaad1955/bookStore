import Joi from "joi";

export const updatePasswordSchema = Joi.object({
    lostPassword: Joi.string()
        .required()
        .messages({
            "string.base": "Старий пароль повинен бути текстовим значенням",
            "string.empty": "Старий пароль є обов'язковим",
            "any.required": "Старий пароль є обов'язковим",
        }),

    newPassword: Joi.string()
        .min(8)
        .max(64)
        .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/)
        .messages({
            "string.base": "Новий пароль повинен бути текстовим значенням",
            "string.empty": "Новий пароль є обов'язковим",
            "string.min": "Новий пароль повинен містити щонайменше 8 символів",
            "string.max": "Новий пароль не повинен перевищувати 64 символи",
            "string.pattern.base":
                "Пароль має містити хоча б одну велику літеру, цифру і спеціальний символ",
            "any.required": "Новий пароль є обов'язковим",
        }),

    confirmPassword: Joi.any()
        .valid(Joi.ref("newPassword"))
        .required()
        .messages({
            "any.only": "Паролі не співпадають",
            "any.required": "Підтвердження пароля є обов'язковим",
        }),
});
