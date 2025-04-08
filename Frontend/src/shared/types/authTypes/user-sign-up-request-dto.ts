type UserSignUpRequestDto = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  phoneNumber: number;
  file: File | null;
};

export { type UserSignUpRequestDto };
