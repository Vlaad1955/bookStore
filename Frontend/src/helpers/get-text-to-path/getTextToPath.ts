import { AppRoute } from "@/features/auth/enums/app-route.enums";

const getText = (pathname: string, type: string): string => {
  type Properties = Record<string, string>;

  const titles: Properties = {
    [AppRoute.SIGN_IN]: "Вхід",
    [AppRoute.SIGN_UP]: "Реєстрація",
  };

  const authText: Properties = {
    [AppRoute.SIGN_IN]: "Не має акаунту?",
    [AppRoute.SIGN_UP]: "Маєте акаунт?",
  };

  const authLink: Properties = {
    [AppRoute.SIGN_IN]: "Реєстрація",
    [AppRoute.SIGN_UP]: "Вхід",
  };

  const forgotPasswordText: Properties = {
    [AppRoute.SIGN_IN]: "Забули пароль?",
  };

  const forgotPasswordLink: Properties = {
    [AppRoute.SIGN_IN]: "Скинути пароль",
  };

  switch (type) {
    case "title": {
      return titles[pathname] || "";
    }
    case "authText": {
      return authText[pathname] || "";
    }
    case "authLink": {
      return authLink[pathname] || "";
    }
    case "forgotText": {
      return forgotPasswordText[pathname] || "";
    }
    case "forgotLink": {
      return forgotPasswordLink[pathname] || "";
    }
    default: {
      return "";
    }
  }
};

export { getText };
