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
  age: joi.number().min(8).max(100).required().messages({
    "number.base": "Age must be a number",
    "number.min": "Age must be at least 8",
    "number.max": "Age must be at most 120",
    "any.required": "Age is required",
  }),
  phoneNumber: joi.number().min(8).max(15).required().messages({
    "string.empty": "Phone number is required",
    "string.min": "Phone number must be at least 8 digits",
    "string.max": "Phone number must be at most 15 digits",
  }),
  file: joi
    .string()
    .pattern(/\.(svg|png|jpg|jpeg)$/i)
    .required()
    .messages({
      "string.empty": "File is required",
      "string.pattern.base": "Only SVG, PNG, and JPEG files are allowed",
    }),
});

export { userSignUp };
