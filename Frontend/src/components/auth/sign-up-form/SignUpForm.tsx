"use client";

import { UserSignUpRequestDto } from "@/shared/types/authTypes/user-sign-up-request-dto";
import React, { useState } from "react";
import { DEFAULT_SIGN_UP_PAYLOAD } from "@/shared/constants/DEFAULT_SIGN_UP_PAYLOAD";
import { useAuthStore } from "@/shared/auth/auth-store/use-auth-store";
import { useAppForm } from "@/shared/hooks/use-app-form/use-app-form.hook";
import { userSignUpValidationSchema } from "@/shared/validation-schemas/validation-schemas";
import { Input } from "../../ui/input/Input";
import { InputType } from "@/shared/enums/users/input-type.enum";
import styles from "./styles.module.scss";
import { Button } from "@/components/ui/button/Button";
import { ButtonType } from "@/shared/enums/button/button-type.enum";

type Properties = {
  onSubmit: (event: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = () => {
  const { signUp, isLoading, error } = useAuthStore();
  const [formError, setFormError] = useState<string | null>(null);

  const { control, handleSubmit, errors } = useAppForm<UserSignUpRequestDto>({
    defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
    validationSchema: userSignUpValidationSchema,
    mode: "onBlur",
  });

  const handleFormSubmit = async (user: UserSignUpRequestDto) => {
    if (!user.email || !user.password) {
      setFormError("Будь ласка, заповніть усі поля");
      return;
    }
    console.log("Submitting user:", user);

    try {
      await signUp(user);
      console.log(user);
    } catch (error) {
      setFormError("Помилка входу. Перевірте дані.");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      {formError && <p style={{ color: "red" }}>{formError}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p className={styles.inputWrapper}>
        <Input
          name="email"
          type={InputType.EMAIL}
          label="E-mail"
          placeholder="E-mail address"
          control={control}
          errors={errors}
          inputClassName={styles.inputPages}
        />
      </p>
      <p className={styles.inputWrapper}>
        <Input
          name="password"
          type={InputType.PASSWORD}
          label="Password"
          placeholder="Password"
          control={control}
          errors={errors}
          inputClassName={styles.inputPages}
        />
      </p>
      <p className={styles.inputWrapper}>
        <Input
          name="firstName"
          type={InputType.TEXT}
          label="First Name"
          placeholder="First Name"
          control={control}
          errors={errors}
          inputClassName={styles.inputPages}
        />
      </p>
      <p className={styles.inputWrapper}>
        <Input
          name="lastName"
          type={InputType.TEXT}
          label="Last Name"
          placeholder="Last Name"
          control={control}
          errors={errors}
          inputClassName={styles.inputPages}
        />
      </p>
      <p className={styles.inputWrapper}>
        <Input
          name="age"
          type={InputType.NUMBER}
          label="Age"
          placeholder="Age"
          control={control}
          errors={errors}
          inputClassName={styles.inputPages}
        />
      </p>
      <p className={styles.inputWrapper}>
        <Input
          name="phoneNumber"
          type={InputType.TEXT}
          label="Number"
          placeholder="Number"
          control={control}
          errors={errors}
          inputClassName={styles.inputPages}
        />
      </p>
      <p className={styles.inputWrapper}>
        <Input
          name="file"
          type={InputType.FILE}
          label="Image"
          placeholder="Image"
          control={control}
          errors={errors}
          inputClassName={styles.inputPages}
        />
      </p>
      <Button
        className={styles.formButton}
        type={ButtonType.SUBMIT}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Sign Up"}
      </Button>
    </form>
  );
};

export default SignUpForm;
