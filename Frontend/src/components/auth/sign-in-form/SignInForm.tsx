"use client";

import React, { useState } from "react";
import { useAuthStore } from "@/shared/auth/auth-store/use-auth-store";
import { useAppForm } from "@/shared/hooks/use-app-form/use-app-form.hook";
import { UserSignInRequestDto } from "@/shared/types/authTypes/user-sign-in-request-dto";
import { DEFAULT_SIGN_IN_PAYLOAD } from "@/shared/constants/DEFAULT_SIGN_IN_PAYLOAD";
import { userSignInValidationSchema } from "@/shared/validation-schemas/validation-schemas";
import { InputType } from "@/shared/enums/users/input-type.enum";
import { Input } from "../../ui/input/Input";
import styles from "./styles.module.scss";
import { Button } from "@/components/ui/button/Button";
import { ButtonType } from "@/shared/enums/button/button-type.enum";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignInForm: React.FC = () => {
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
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      {formError && <p style={{ color: "red" }}>{formError}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p className={styles.inputWrapper}>
        <Input
          type={InputType.EMAIL}
          label="E-mail"
          placeholder="E-mail address"
          errors={errors}
          control={control}
          inputClassName={styles.inputPages}
          name="email"
        />
      </p>
      <p className={styles.inputWrapper}>
        <Input
          type={InputType.PASSWORD}
          label="Password"
          placeholder="Password"
          errors={errors}
          control={control}
          inputClassName={styles.inputPages}
          name="password"
        />
      </p>
      <Button
        className={styles.formButton}
        type={ButtonType.SUBMIT}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Log In"}
      </Button>
    </form>
  );
};

export default SignInForm;
