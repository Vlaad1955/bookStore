"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button/Button";
import { Input } from "../../ui/input/Input";
import { useAuthStore } from "@/shared/auth/auth-store/use-auth-store";
import { useAppForm } from "@/shared/hooks/use-app-form/useAppForm.hook";
import { InputType } from "@/components/ui/input/input-type/input-type.enum";
import { ButtonType } from "@/components/ui/button/button-type/button-type.enum";
import { UserSignInRequestDto } from "@/shared/auth/authTypes/user-sign-in-request-dto";
import { userSignInValidationSchema } from "@/shared/validation-schemas/validation-schemas";
import { DEFAULT_SIGN_IN_PAYLOAD } from "@/shared/auth/constants/DEFAULT_SIGN_IN_PAYLOAD";
import styles from "./styles.module.scss";

const SignInForm = () => {
  const router = useRouter();
  const { signIn, isLoading, error } = useAuthStore();
  const [formError, setFormError] = useState<string | null>(null);
  const { handleSubmit, errors, control } = useAppForm<UserSignInRequestDto>({
    defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
    validationSchema: userSignInValidationSchema,
  });

  const handleFormSubmit = async (user: UserSignInRequestDto) => {
    try {
      await signIn(user);
      if (useAuthStore.getState().isAuthenticated) {
        toast.success("you are log-in");
        router.push("/");
      }
    } catch (error) {
      toast.error(error.message || "you are not login");
      setFormError("Помилка входу. Перевірте дані.");
      throw error;
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      {formError && <p style={{ color: "red" }}>{formError}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p className={styles.input_wrapper}>
        <Input
          type={InputType.EMAIL}
          label="E-mail"
          placeholder="E-mail address"
          errors={errors}
          control={control}
          inputClassName={styles.input_pages}
          name="email"
        />
      </p>
      <p className={styles.input_wrapper}>
        <Input
          type={InputType.PASSWORD}
          label="Password"
          placeholder="Password"
          errors={errors}
          control={control}
          inputClassName={styles.input_pages}
          name="password"
        />
      </p>
      <Button
        className={styles.form_button}
        type={ButtonType.SUBMIT}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Log In"}
      </Button>
    </form>
  );
};

export default SignInForm;
