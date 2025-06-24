import { UserSignUpRequestDto } from "../authTypes/user-sign-up-request-dto";

const DEFAULT_SIGN_UP_PAYLOAD: UserSignUpRequestDto = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  age: 18,
  phone: "",
  image: undefined,
};

export { DEFAULT_SIGN_UP_PAYLOAD };
