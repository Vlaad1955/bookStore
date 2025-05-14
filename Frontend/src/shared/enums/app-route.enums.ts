const AppRoute = {
  ROOT: "/",
  SIGN_IN: "/auth/sign-in",
  SIGN_UP: "/auth/sign-up",
  ORDERS: "/my-account/orders",
  FAVORITE: "/my-account/my-library",
  LIBRARY: "/my-account/favorite-books",
  EXPECTEDGOODS: "/my-account/expected-goods",
  CHANGE_ACCOUNT: "/my-account/change-account",
} as const;

export { AppRoute };
