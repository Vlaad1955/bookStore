"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Form from "next/form";

import { Button } from "@/components/ui/button/Button";
import { Input } from "../../ui/input/Input";
import { useAuthStore } from "@/shared/auth/auth-store/use-auth-store";
import { useAppForm } from "@/shared/hooks/use-app-form/useAppForm.hook";
import { ButtonType } from "@/components/ui/button/button-type/button-type.enum";
import { InputType } from "@/components/ui/input/input-type/input-type.enum";
import { UserSignUpRequestDto } from "@/shared/auth/authTypes/user-sign-up-request-dto";
import { userSignUpValidationSchema } from "@/shared/validation-schemas/validation-schemas";
import { DEFAULT_SIGN_UP_PAYLOAD } from "@/shared/auth/constants/DEFAULT_SIGN_UP_PAYLOAD";
import styles from "./styles.module.scss";

const SignUpForm = () => {
  const router = useRouter();

  const { signUp, isLoading, error } = useAuthStore();
  const [formError, setFormError] = useState<string | null>(null);

  const { control, handleSubmit, errors } = useAppForm<UserSignUpRequestDto>({
    defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
    // validationSchema: userSignUpValidationSchema,
    mode: "onBlur",
  });

  const handleFormSubmit = async (user: UserSignUpRequestDto) => {
    if (!user.email || !user.password) {
      setFormError("Будь ласка, заповніть усі поля");
      return;
    }

    try {
      await signUp(user);
      if (useAuthStore.getState().isAuthenticated) {
        toast.success("you are register successfully");
        router.push("/");
      }
    } catch (error) {
      toast.error(error.message || "you are not login");
      setFormError("Помилка входу. Перевірте дані.");
      throw error;
    }
  };

  return (
    <Form
      className={styles.form}
      onSubmit={handleSubmit(handleFormSubmit)}
      action={""}
    >
      {formError && <p style={{ color: "red" }}>{formError}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p className={styles.input_wrapper}>
        <Input
          name="email"
          type={InputType.EMAIL}
          label="E-mail"
          placeholder="E-mail address"
          control={control}
          errors={errors}
          inputClassName={styles.input_pages}
        />
      </p>
      <p className={styles.input_wrapper}>
        <Input
          name="password"
          type={InputType.PASSWORD}
          label="Password"
          placeholder="Password"
          control={control}
          errors={errors}
          inputClassName={styles.input_pages}
        />
      </p>
      <p className={styles.input_wrapper}>
        <Input
          name="firstName"
          type={InputType.TEXT}
          label="First Name"
          placeholder="First Name"
          control={control}
          errors={errors}
          inputClassName={styles.input_pages}
        />
      </p>
      <p className={styles.input_wrapper}>
        <Input
          name="lastName"
          type={InputType.TEXT}
          label="Last Name"
          placeholder="Last Name"
          control={control}
          errors={errors}
          inputClassName={styles.input_pages}
        />
      </p>
      <p className={styles.input_wrapper}>
        <Input
          name="age"
          type={InputType.NUMBER}
          label="Age"
          placeholder="Age"
          control={control}
          errors={errors}
          inputClassName={styles.input_pages}
        />
      </p>
      <p className={styles.input_wrapper}>
        <Input
          name="phone"
          type={InputType.TEXT}
          label="Number"
          placeholder="Number"
          control={control}
          errors={errors}
          inputClassName={styles.input_pages}
        />
      </p>
      <p className={styles.input_wrapper}>
        <Input
          name="image"
          type={InputType.FILE}
          label="Image"
          placeholder="Image"
          control={control}
          errors={errors}
          inputClassName={styles.input_pages}
        />
      </p>
      <Button
        className={styles.form_button}
        type={ButtonType.SUBMIT}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Sign Up"}
      </Button>
    </Form>
  );
};

export default SignUpForm;
