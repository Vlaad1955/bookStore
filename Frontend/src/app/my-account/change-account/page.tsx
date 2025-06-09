// import { cookies } from "next/headers";
// import ChangeAccountClient from "./ChangeAccountClient";
// import { getUser } from "@/shared/user/user-service/user-service"; // Твоя функція отримання користувача по кукі

import ChangeAccountClient from "@/features/change-account/components/ChangeAccountClint";

export default async function ChangeAccountPage() {
  // Приклад отримання користувача на сервері (SSR)
  // Тобі треба підлаштувати під свій бекенд і авторизацію
  // const cookieStore = cookies();
  // const token = cookieStore.get("accessToken")?.value ?? null;

  // let user = null;
  // if (token) {
  // user = await getUser(token); // Запрос до API, що повертає user data
  // }

  // Якщо user відсутній, можна зробити редірект або показати заглушку
  // if (!user) {
  // return <p>Вхід потрібен для редагування профілю</p>;
  // }

  return <ChangeAccountClient />;
}
