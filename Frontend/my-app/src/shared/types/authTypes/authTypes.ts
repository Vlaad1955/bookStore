export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

type UserSignInRequestDto = {
  email: string;
  password: string;
};

type UserSignUpRequestDto = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  age: number;
  phoneNumber: number;
  file: File | null;
};

export { type UserSignInRequestDto, type UserSignUpRequestDto };
