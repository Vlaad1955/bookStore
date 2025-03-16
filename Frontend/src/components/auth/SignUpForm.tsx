"use client";

import { UserSignUpRequestDto } from "@/shared/types/authTypes/authTypes";
import { useAppForm } from "@/shared/hooks/useAppForm";
import React, { useState } from "react";
import { DEFAULT_SIGN_UP_PAYLOAD } from "@/shared/constants/DEFAULT_SIGN_UP_PAYLOAD";
import { useAuthStore } from "@/shared/store/authStore";

type Properties = {
  onSubmit: (event: UserSignUpRequestDto) => void;
};

const SignUpForm: React.FC<Properties> = () => {
  const { signUp, isLoading, error } = useAuthStore();
  const [formError, setFormError] = useState<string | null>(null);

  const {
    // control,
    watch,
    trigger,
    register,
    // handleSubmit,
    // formState: { errors },
  } = useAppForm<UserSignUpRequestDto>({
    defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
    // validationSchema: ,
    mode: "onBlur",
  });

  const handleFormSubmit = async (event_: React.BaseSyntheticEvent) => {
    event_.preventDefault();
    void trigger();
    const formData = watch();

    if (!formData.email || !formData.password) {
      setFormError("Будь ласка, заповніть усі поля");
      return;
    }

    try {
      await signUp(formData);
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
      <input
        type="text"
        // label="First Name"
        placeholder="First Name"
        // control={control}
        {...register("firstName")}
        // errors={errors}
      />
      <input
        type="text"
        // label="Last Name"
        placeholder="Last Name"
        // control={control}
        {...register("lastName")}
        // errors={errors}
      />
      <input
        type="number"
        // label="Age"
        placeholder="Age"
        // control={control}
        {...register("age")}
        // errors={errors}
      />
      <input
        type="number"
        // label="Number"
        placeholder="Number"
        // control={control}
        {...register("phoneNumber")}
        // errors={errors}
      />
      <input
        type="file"
        // label="Image"
        placeholder="Image"
        // control={control}
        {...register("file")}
        // errors={errors}
      />
      {/* <button type="submit">Sign Up</button> */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Loading..." : "Sign Up"}
      </button>
    </form>
  );
};

export default SignUpForm;
