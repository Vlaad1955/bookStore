"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { authService } from "@/features/auth/auth-service/authService";
import { Input } from "../../ui/input/Input";
import { Button } from "@/components/ui/button/Button";
import styles from "./styles.module.scss";
import { InputType } from "@/components/ui/input/input-type/input-type.enum";
import { ButtonType } from "@/components/ui/button/button-type/button-type.enum";
import { joiResolver } from "@hookform/resolvers/joi";
import { resetPasswordValidationSchema } from "@/shared/validation-schemas/reset-password.validation-schema";

interface ResetPasswordFormFields {
  email: string;
}

const ResetPasswordForm = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ResetPasswordFormFields>({
    defaultValues: {
      email: "",
    },
    resolver: joiResolver(resetPasswordValidationSchema),
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleFormSubmit = async (data: ResetPasswordFormFields) => {
    setIsLoading(true);
    setFormError("");

    try {
      await authService.resetPassword(data.email);
      toast.success("Новий пароль відправлено на email.");
      router.push("/auth/sign-in");
    } catch (e: any) {
      const message = e?.response?.data?.message || "";

      if (message.includes("Забагато спроб")) {
        setFormError("Забагато спроб. Спробуйте через 10 хвилин.");
        toast.error("Забагато спроб. Спробуйте через 10 хвилин.");
      } else if (message.includes("User not found")) {
        setFormError("Користувача з такою поштою не знайдено.");
      } else {
        setFormError("Помилка при скиданні пароля. Спробуйте пізніше.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.password_container}>
      <div className={styles.title}>Скинути пароль</div>
      <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
        {formError && <p style={{ color: "red" }}>{formError}</p>}

        <div className={styles.input_wrapper}>
          <Input
            type={InputType.EMAIL}
            label="Введіть ваш E-mail"
            placeholder="E-mail address"
            errors={errors}
            control={control}
            inputClassName={styles.input_pages}
            name="email"
          />
        </div>

        <Button
          className={styles.form_button}
          type={ButtonType.SUBMIT}
          disabled={isLoading}
        >
          {isLoading ? "Завантаження..." : "Скинути пароль"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
