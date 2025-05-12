import { UserSignUpRequestDto } from "../types/authTypes/user-sign-up-request-dto";

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  age: 18,
  phoneNumber: "",
  image: undefined,
};

export { DEFAULT_SIGN_UP_PAYLOAD };
