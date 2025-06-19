import { authApi } from "../auth-api/authApi";
import { isTokenValid } from "@/shared/token/decodeToken";
import { UserSignInRequestDto } from "@/shared/auth/authTypes/user-sign-in-request-dto";
import { UserSignUpRequestDto } from "@/shared/auth/authTypes/user-sign-up-request-dto";
import axiosInstance from "../auth-axios-instance/axiosInstance";
import { tokenStorage } from "@/shared/token/UseTokenStore";

class AuthService {
  private isLoading = false;
  private error: string | null = null;

  async signIn(payload: UserSignInRequestDto) {
    try {
      const response = await authApi.signIn(payload);
      const { accessToken } = response.data;

      if (!isTokenValid(accessToken)) throw new Error("Invalid token");

      tokenStorage.setToken(accessToken);
      axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;

      return accessToken;
    } catch (error) {
      this.error = "Помилка входу";
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async signUp(payload: UserSignUpRequestDto) {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await authApi.signUp(payload);
      const { accessToken } = response.data;
      if (!isTokenValid(accessToken)) throw new Error("Invalid token");

      tokenStorage.setToken(accessToken);
      axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;

      return accessToken;
    } catch (error) {
      this.error = "Помилка реєстрації";
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async refreshToken(): Promise<string> {
    try {
      const { data } = await axiosInstance.post("/auth/refresh", {});
      const { accessToken } = data;

      if (!isTokenValid(accessToken)) {
        throw new Error("Invalid refreshed token");
      }

      tokenStorage.setToken(accessToken);
      axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
      return accessToken;
    } catch {
      tokenStorage.removeToken();
      delete axiosInstance.defaults.headers.Authorization;
      throw new Error("Failed to refresh token");
    }
  }

  async logout() {
    try {
      await authApi.logout();
    } finally {
      tokenStorage.removeToken();
      delete axiosInstance.defaults.headers.Authorization;
    }
  }
}

export const authService = new AuthService();
