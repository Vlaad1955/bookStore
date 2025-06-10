import { AppRoute } from "@/shared/auth/enums/app-route.enums";

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
    default: {
      return "";
    }
  }
};

export { getText };
