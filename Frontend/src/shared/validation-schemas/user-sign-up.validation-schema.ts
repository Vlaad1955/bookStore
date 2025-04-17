import joi from "joi";

import { UserValidationMessage } from "../enums/users/user-validation-message.enum";
import { type UserSignUpRequestDto } from "../types/authTypes/user-sign-up-request-dto";

const emailRegExp = /^[^\s@]+(?:\.[^\s@]+)*@[\w-]+(?:\.[\w-]+)+$/;
const INVALID_EMAIL_ERROR = "any.invalid";

const userSignUp = joi.object<UserSignUpRequestDto, true>({
  email: joi
    .string()
    .pattern(emailRegExp)
    .required()
    .messages({
      "string.pattern.base": UserValidationMessage.EMAIL_WRONG,
      "string.empty": UserValidationMessage.EMAIL_REQUIRE,
    })
    .custom((value, helpers) => {
      const [localPart, domainPart] = value.split("@");

      if (localPart.length === 0) {
        return helpers.error(INVALID_EMAIL_ERROR);
      }

      if (localPart.length > 15) {
        return helpers.error(INVALID_EMAIL_ERROR);
      }

      if (
        localPart.startsWith(".") ||
        localPart.endsWith(".") ||
        /\.+/g.test(localPart)
      ) {
        return helpers.error(INVALID_EMAIL_ERROR);
      }

      if (domainPart.length < 3 || domainPart.length > 15) {
        return helpers.error(INVALID_EMAIL_ERROR);
      }

      if (!domainPart.includes(".")) {
        return helpers.error(INVALID_EMAIL_ERROR);
      }

      if (
        domainPart.startsWith(".") ||
        domainPart.endsWith(".") ||
        /(\.-)|(-\.)/g.test(domainPart)
      ) {
        return helpers.error(INVALID_EMAIL_ERROR);
      }

      if (value.split("@").length !== 2) {
        return helpers.error(INVALID_EMAIL_ERROR);
      }

      return value;
    })
    .messages({
      "any.invalid": UserValidationMessage.EMAIL_WRONG,
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
  age: joi.string().pattern(/^\d+$/).min(1).max(3).required().messages({
    "string.pattern.base": "Age must be a number",
    "string.min": "Age must be at least 1 digit",
    "string.max": "Age must be at most 3 digits",
    "any.required": "Age is required",
  }),
  phoneNumber: joi
    .string()
    .pattern(/^\d{8,15}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be between 8 and 15 digits",
    }),
  image: joi.any().optional(),
});

export { userSignUp };
