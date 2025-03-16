import { UserSignUpRequestDto } from "../types/authTypes/authTypes";

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  age: 0,
  phoneNumber: 0,
  file: null,
};

export { DEFAULT_SIGN_UP_PAYLOAD };
