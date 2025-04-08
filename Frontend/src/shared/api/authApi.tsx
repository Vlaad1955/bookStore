// import { create } from "zustand";
// import { type UserSignInRequestDto } from "../types/authTypes/user-sign-in-request-dto";
// import { type UserSignUpRequestDto } from "../types/authTypes/user-sign-up-request-dto";

// import axiosInstance from "../auth/auth-axios-instance/axiosInstance";
// import { isTokenValid } from "../hooks/decodeToken";

// interface AuthState {
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   token: string | null;
//   user: unknown | null;
//   error: string | null;
//   checkAuth: () => Promise<void>;
//   signIn: (payload: UserSignInRequestDto) => void;
//   signUp: (payload: UserSignUpRequestDto) => void;
//   logout: () => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   isAuthenticated: false,
//   isLoading: false,
//   token: null,
//   error: null,
//   user: null,

//   checkAuth: async () => {
//     try {
//       const { data } = await axiosInstance.get("/auth/me");
//       set({ isAuthenticated: true, user: data });
//     } catch (error) {
//       set({ isAuthenticated: false, user: null });
//     }
//   },

//   signIn: async (payload) => {
//     set({ isLoading: true, error: null });
//     try {
//       console.log("Payload:", payload);
//       const response = await axiosInstance.post("/auth/login", payload);
//       const { accessToken } = response.data;
//       console.log("Отриманий токен:", accessToken);
//       if (!isTokenValid(accessToken)) throw new Error("Invalid token");

//       set({
//         isAuthenticated: true,
//         // isAuthenticated: isTokenValid(accessToken),
//         token: accessToken,
//         isLoading: false,
//       });

//       axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
//     } catch (error) {
//       console.error("Sign In Error:", error);
//       set({ isLoading: false, error: "Помилка входу" });
//       throw error;
//     }
//   },

//   signUp: async (payload) => {
//     set({ isLoading: true, error: null });
//     try {
//       console.log("Payload:", payload);

//       const response = await axiosInstance.post("/auth/registration", payload);
//       const { accessToken } = response.data;

//       if (!isTokenValid(accessToken)) throw new Error("Invalid token");

//       set({
//         isAuthenticated: isTokenValid(accessToken),
//         token: accessToken,
//         isLoading: false,
//       });

//       axiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;
//     } catch (error) {
//       console.error("Sign Up Error:", error);
//       set({ isLoading: false, error: "Помилка реєстрації" });
//     }
//   },

//   logout: async () => {
//     try {
//       await axiosInstance.post("/auth/logout");
//     } catch (error) {
//       console.error("Помилка при виході:", error);
//     }

//     set({ isAuthenticated: false, token: null, user: null });
//     delete axiosInstance.defaults.headers.Authorization;
//   },
// }));
