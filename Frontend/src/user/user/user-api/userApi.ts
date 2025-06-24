import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";
import { User } from "../store/UseUserStore";
import {passwordDto} from "@/features/password/types/password";

export const userApi = {
  fetchCurrentUser: () => axiosInstance.get("/users/find"),
  updateUser: (id: string, payload: Partial<User>) =>
    axiosInstance.patch(`/users/update/${id}`, payload),
  deleteUser: (id: string) => axiosInstance.delete(`/users/delete/${id}`),
  updatePassword: (dto: passwordDto) => axiosInstance.patch('/auth/newPassword', dto),
};
