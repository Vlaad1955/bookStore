import { authApi } from "../auth-api/auth-api";
import { isTokenValid } from "@/shared/hooks/decodeToken";
import { UserSignInRequestDto } from "@/shared/types/authTypes/user-sign-in-request-dto";
import { UserSignUpRequestDto } from "@/shared/types/authTypes/user-sign-up-request-dto";
import axiosInstance from "../auth-axios-instance/axiosInstance";

class AuthService {
  private token: string | null = null;
  private user: unknown | null = null;
  private isAuthenticated = false;
  private isLoading = false;
  private error: string | null = null;

  async checkAuth() {
    try {
      const { data } = await authApi.fetchCurrentUser();
      this.isAuthenticated = true;
      this.user = data;
    } catch {
      this.isAuthenticated = false;
      this.user = null;
    }
  }

  async signIn(payload: UserSignInRequestDto) {
    this.isLoading = true;
    this.error = null;
    try {
      const response = await authApi.signIn(payload);
      const { accessToken } = response.data;
      if (!isTokenValid(accessToken)) throw new Error("Invalid token");

      this.isAuthenticated = true;
      this.token = accessToken;
      axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
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

      this.isAuthenticated = true;
      this.token = accessToken;
      axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
    } catch (error) {
      this.error = "Помилка реєстрації";
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async logout() {
    try {
      await authApi.logout();
    } catch (error) {
      console.error("Помилка при виході:", error);
    } finally {
      this.isAuthenticated = false;
      this.token = null;
      this.user = null;
      delete axiosInstance.defaults.headers.Authorization;
    }
  }

  getState() {
    return {
      isAuthenticated: this.isAuthenticated,
      isLoading: this.isLoading,
      token: this.token,
      user: this.user,
      error: this.error,
    };
  }
}

export const authService = new AuthService();
