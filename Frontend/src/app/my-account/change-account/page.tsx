"use client";
import { useState, useEffect } from "react";
import ProtectedRoute from "@/shared/protected-route/protected-route";
import { useUserStore } from "@/shared/user/store/UseUserStore";
import { authApi } from "@/shared/auth/auth-api/auth-api";
import { useRouter } from "next/navigation";
import { userApi } from "@/shared/user/user-api/user-api";
import { userService } from "@/shared/user/user-service/user-service";

const ChangeAccount = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const updateUserFields = useUserStore((state) => state.updateUserFields);
  const resetUser = useUserStore((state) => state.resetUser);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    age: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone ?? "",
        age: String(user.age),
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    try {
      const payload = {
        firstName: form.firstName,
        lastName: form.lastName,
        phone: form.phone,
        age: Number(form.age),
      };

      await userService.updateUser(user.id, payload);
      updateUserFields(payload);

      alert("Дані користувача оновлено");
    } catch (error) {
      console.error("Помилка при оновленні:", error);
      alert("Не вдалося оновити дані");
    }
  };

  const handleDelete = async () => {
    if (!user) return;

    try {
      const confirmed = window.confirm(
        "Ви впевнені, що хочете видалити акаунт?"
      );
      if (!confirmed) return;

      resetUser();
      router.push("/");
      await userApi.deleteUser(user.id);
      authApi.logout();
    } catch (error) {
      console.error("Помилка при видаленні акаунта:", error);
      alert("Не вдалося видалити акаунт");
    }
  };

  return (
    <ProtectedRoute>
      <div style={{ maxWidth: 400, margin: "0 auto" }}>
        <h2>Редагування профілю</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="Ім'я"
            value={form.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Прізвище"
            value={form.lastName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Телефон"
            value={form.phone}
            onChange={handleChange}
          />
          <input
            type="number"
            name="age"
            placeholder="Вік"
            value={form.age}
            onChange={handleChange}
          />

          <button type="submit">Зберегти зміни</button>
        </form>
      </div>
      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Видалити акаунт
      </button>
    </ProtectedRoute>
  );
};

export default ChangeAccount;
