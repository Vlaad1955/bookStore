"use client";

import { UserSignInRequestDto } from "@/shared/types/authTypes/authTypes";
import { useAppForm } from "@/shared/hooks/useAppForm";
import React, { useState } from "react";
import { DEFAULT_SIGN_IN_PAYLOAD } from "@/shared/constants/DEFAULT_SIGN_IN_PAYLOAD";
import { useAuthStore } from "@/shared/api/authApi";

type Properties = {
  onSubmit: (event: UserSignInRequestDto) => void;
};

const SignInForm: React.FC<Properties> = () => {
  const { signIn, isLoading, error } = useAuthStore();
  const [formError, setFormError] = useState<string | null>(null);
  const {
    // control,
    watch,
    trigger,
    register,
    // handleSubmit,
    // formState: { errors },
  } = useAppForm<UserSignInRequestDto>({
    defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
    // validationSchema: ,
  });

  const handleFormSubmit = async (event_: React.BaseSyntheticEvent) => {
    event_.preventDefault();
    void trigger();
    const email = watch("email");
    const password = watch("password");

    if (!email || !password) {
      setFormError("Будь ласка, заповніть усі поля");
      return;
    }
    console.log({ email, password });
    console.log({ email, password });

    try {
      await signIn({ email, password }); // Викликаємо signIn без зайвих обгорток
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setFormError("Помилка входу. Перевірте дані.");
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {formError && <p style={{ color: "red" }}>{formError}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        // label="E-mail"
        placeholder="E-mail address"
        // control={control}
        {...register("email")}
        // errors={errors}
      />
      <input
        type="password"
        // label="Password"
        placeholder="Password"
        // control={control}
        {...register("password")}
        // errors={errors}
      />
      {/* <button type="submit">Log In</button> */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Log In"}
      </button>
    </form>
  );
};

export default SignInForm;
