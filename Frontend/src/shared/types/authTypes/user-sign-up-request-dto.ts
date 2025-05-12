type UserSignUpRequestDto = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  phoneNumber: string;
  image?: File;
};

export { type UserSignUpRequestDto };
