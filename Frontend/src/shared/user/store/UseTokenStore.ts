const SECRET_KEY = "simple_key_123"; // 🔐 заміни на щось складніше у проді
const TOKEN_KEY = "accessToken";

function encrypt(text: string): string {
  return btoa(`${SECRET_KEY}:${text}`);
}

function decrypt(text: string): string {
  const decoded = atob(text);
  return decoded.split(":")[1];
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
