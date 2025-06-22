import joi from "joi";

import { UserValidationMessage } from "../../features/user/user-validation-message.enum";
import { type UserSignUpRequestDto } from "@/features/auth/authTypes/user-sign-up-request-dto";

const userSignUp = joi.object<UserSignUpRequestDto, true>({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": UserValidationMessage.EMAIL_WRONG,
      "string.empty": UserValidationMessage.EMAIL_REQUIRE,
    }),
  password: joi.string().trim().min(8).max(30).required().messages({
    "string.empty": UserValidationMessage.PASSWORD_REQUIRE,
    "string.min": UserValidationMessage.PASSWORD_MIN,
    "string.max": UserValidationMessage.PASSWORD_MAX,
  }),
  firstName: joi.string().trim().min(2).max(30).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters",
    "string.max": "First name must be at most 30 characters",
  }),
  lastName: joi.string().trim().min(2).max(30).required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters",
    "string.max": "Last name must be at most 30 characters",
  }),
  age: joi.number().required().messages({
    "string.pattern.base": "Age must be a number",
    "string.min": "Age must be at least 1 digit",
    "string.max": "Age must be at most 3 digits",
    "any.required": "Age is required",
  }),
  phone: joi.string().required().messages({
    "string.empty": "Phone number is required",
    "string.pattern.base": "Phone number must be between 8 and 15 digits",
  }),
  image: joi.object().optional(),
});

export { userSignUp };
