import { User } from "../store/UseUserStore";
import { userApi } from "../user-api/userApi";

class UserService {
  async getCurrentUser(): Promise<User | undefined> {
    const response = await userApi.fetchCurrentUser();
    return response.data;
  }

  async updateUser(id: string, payload: Partial<User>) {
    const response = await userApi.updateUser(id, payload);
    return response.data;
  }
}

export const userService = new UserService();
