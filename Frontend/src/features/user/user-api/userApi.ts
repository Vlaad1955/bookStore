import axiosInstance from "@/features/auth/auth-axios-instance/axiosInstance";
import { User } from "../store/UseUserStore";

export const userApi = {
  fetchCurrentUser: () => axiosInstance.get("/users/find"),
  updateUser: (id: string, payload: Partial<User>) =>
    axiosInstance.patch(`/users/update/${id}`, payload),
  deleteUser: (id: string) => axiosInstance.delete(`/users/delete/${id}`),
};
