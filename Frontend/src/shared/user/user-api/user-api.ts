import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";
import { User } from "@/shared/user/store/UseUserStore";

export const userApi = {
  fetchCurrentUser: () => axiosInstance.get("/users/find"),
  updateUser: (id: string, payload: Partial<User>) =>
    axiosInstance.patch(`/users/update/${id}`, payload),
  deleteUser: (id: string) => axiosInstance.delete(`/users/delete/${id}`),
};
