type UserSignUpRequestDto = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  phone: string;
  image?: File;
};

export { type UserSignUpRequestDto };
