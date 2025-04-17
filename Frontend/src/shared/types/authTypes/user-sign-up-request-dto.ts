type UserSignUpRequestDto = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: string;
  phoneNumber: string;
  image?: File;
};

export { type UserSignUpRequestDto };
