const AppRoute = {
  ROOT: "/",
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  ORDERS: "/my-account/orders",
  NEWS: "/my-account/news",
  LIBRARY: "/my-account/my-library",
  EXPECTEDGOODS: "/my-account/expected-goods",
  CHANGE_ACCOUNT: "/my-account/change-account",
  BASKET: "/my-account/basket",
  ADMIN: "/admin",
  RESET:"/auth/reset-password",
  PASSWORD:"/my-account/update-password"
} as const;

export { AppRoute };
