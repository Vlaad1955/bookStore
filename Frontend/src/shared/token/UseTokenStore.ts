const SECRET_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;
const TOKEN_KEY = "accessToken";
const TOKEN_SEPARATOR = "::";

function encrypt(text: string): string {
  return btoa(`${SECRET_KEY}${TOKEN_SEPARATOR}${text}`);
}

function decrypt(text: string): string {
  const decoded = atob(text);
  const parts = decoded.split(TOKEN_SEPARATOR);
  return parts[1] ?? null;
}

export const tokenStorage = {
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      const encrypted = encrypt(token);
      sessionStorage.setItem(TOKEN_KEY, encrypted);
    }
  },

  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      const encrypted = sessionStorage.getItem(TOKEN_KEY);
      return encrypted ? decrypt(encrypted) : null;
    }
    return null;
  },

  removeToken: () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(TOKEN_KEY);
    }
  },
};
