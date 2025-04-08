import axiosInstance from "../auth-axios-instance/axiosInstance";
import { UserSignInRequestDto } from "@/shared/types/authTypes/user-sign-in-request-dto";
import { UserSignUpRequestDto } from "@/shared/types/authTypes/user-sign-up-request-dto";

export const authApi = {
  signIn: (payload: UserSignInRequestDto) =>
    axiosInstance.post("/auth/login", payload),
  signUp: (payload: UserSignUpRequestDto) =>
    axiosInstance.post("/auth/registration", payload),
  logout: () => axiosInstance.post("/auth/logout"),
  fetchCurrentUser: () => axiosInstance.get("/auth/me"),
};
