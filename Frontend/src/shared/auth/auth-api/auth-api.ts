import axiosInstance from "../auth-axios-instance/axiosInstance";
import { UserSignInRequestDto } from "@/shared/types/authTypes/user-sign-in-request-dto";
import { UserSignUpRequestDto } from "@/shared/types/authTypes/user-sign-up-request-dto";

export const authApi = {
  signIn: (payload: UserSignInRequestDto) =>
    axiosInstance.post("/auth/login", payload),
  signUp: (payload: UserSignUpRequestDto) => {
    const formData = new FormData();
    formData.append("email", payload.email);
    formData.append("password", payload.password);
    formData.append("firstName", payload.firstName);
    formData.append("lastName", payload.lastName);
    formData.append("age", String(payload.age));
    formData.append("phone", payload.phone);
    if (payload.image instanceof File) {
      formData.append("image", payload.image);
    }

    return axiosInstance.post("/auth/registration", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  logout: () => axiosInstance.post("/auth/logout"),
};
