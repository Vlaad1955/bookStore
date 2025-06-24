import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    type DecodedToken = { exp: number; [key: string]: unknown };
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    throw new Error("Invalid token");
  }
};
