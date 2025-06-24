"use client";
import Form from "next/form";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

import ProtectedRoute from "@/shared/protected-route/protectedRoute";
import { authApi } from "@/shared/auth/auth-api/authApi";
import { userApi } from "@/user/user/user-api/userApi";
import { useUserStore } from "@/user/user/store/UseUserStore";
import { userService } from "@/user/user/user-service/userService";
import { Button } from "../../../components/ui/button/Button";
import { ButtonType } from "@/components/ui/button/button-type/button-type.enum";
import { ButtonVariant } from "@/components/ui/button/button-type/button-variant.enum";
import styles from "./styles.module.scss";

const ChangeAccountClient = () => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const updateUserFields = useUserStore((state) => state.updateUserFields);
  const resetUser = useUserStore((state) => state.resetUser);

  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

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

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);

      if (!user) return;

      try {
        const payload = {
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          phone: form.phone.trim(),
          age: Number(form.age),
        };

        await userService.updateUser(user.id, payload);
        updateUserFields(payload);
        toast.success("Дані користувача оновлено");
      } catch {
        toast.error("Не вдалося оновити дані");
      } finally {
        setLoading(false);
      }
    },
    [
      user,
      form.firstName,
      form.lastName,
      form.phone,
      form.age,
      updateUserFields,
    ]
  );

  const handleDelete = useCallback(async () => {
    if (!user) return;

    const confirmed = window.confirm("Ви впевнені, що хочете видалити акаунт?");
    if (!confirmed) return;

    setDeleting(true);

    try {
      await userApi.deleteUser(user.id);
      resetUser();
      authApi.logout();
      toast.success("Акаунт успішно видалено");
      router.push("/auth/sign-in");
    } catch (error) {
      console.error("Помилка при видаленні акаунта:", error);
      toast.error("Не вдалося видалити акаунт");
    } finally {
      setDeleting(false);
    }
  }, [user, resetUser, router]);

  return (
    <ProtectedRoute>
      <div className={styles.change_account_container}>
        <div className={styles.change_account_title}>Редагування профілю</div>
        <Form onSubmit={handleSubmit} action={""}>
          <span className={styles.change_account_label}>Ім&apos;я</span>
          <input
            type="text"
            name="firstName"
            placeholder="Ім'я"
            value={form.firstName}
            onChange={handleChange}
            disabled={loading || deleting}
            className={styles.change_account_input}
          />

          <span className={styles.change_account_label}>Прізвище</span>
          <input
            type="text"
            name="lastName"
            placeholder="Прізвище"
            value={form.lastName}
            onChange={handleChange}
            disabled={loading || deleting}
            className={styles.change_account_input}
          />

          <span className={styles.change_account_label}>Телефон</span>
          <input
            type="text"
            name="phone"
            placeholder="Телефон"
            value={form.phone}
            onChange={handleChange}
            disabled={loading || deleting}
            className={styles.change_account_input}
          />

          <span className={styles.change_account_label}>Вік</span>
          <input
            aria-label="Age"
            type="number"
            name="age"
            placeholder="Вік"
            value={form.age}
            onChange={handleChange}
            disabled={loading || deleting}
            className={styles.change_account_input}
          />

          <Button
            className={styles.change_account_button_submit}
            type={ButtonType.SUBMIT}
            disabled={loading || deleting}
          >
            {loading ? "Збереження..." : "Зберегти зміни"}
          </Button>

          <Button
            variant={ButtonVariant.DELETE}
            onClick={handleDelete}
            className={styles.change_account_button_delete}
            disabled={loading || deleting}
          >
            {deleting ? "Видалення акаунту..." : "Видалити акаунт"}
          </Button>
        </Form>
      </div>
    </ProtectedRoute>
  );
};

export default ChangeAccountClient;
