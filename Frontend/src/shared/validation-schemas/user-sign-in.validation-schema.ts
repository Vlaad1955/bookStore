import joi from "joi";

import { UserValidationMessage } from "../../features/user/user-validation-message.enum";
import { type UserSignInRequestDto } from "../auth/authTypes/user-sign-in-request-dto";

const userSignIn = joi.object<UserSignInRequestDto, true>({
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
});

export { userSignIn };
