"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Form from "next/form";

import { Button } from "@/components/ui/button/Button";
import { Input } from "../../ui/input/Input";
import { useAuthStore } from "@/features/auth/auth-store/useAuthStore";
import { useAppForm } from "@/shared/hooks/use-app-form/useAppForm.hook";
import { ButtonType } from "@/components/ui/button/button-type/button-type.enum";
import { InputType } from "@/components/ui/input/input-type/input-type.enum";
import { UserSignUpRequestDto } from "@/features/auth/authTypes/user-sign-up-request-dto";
import { DEFAULT_SIGN_UP_PAYLOAD } from "@/features/auth/constants/DEFAULT_SIGN_UP_PAYLOAD";
import { userSignUpValidationSchema } from "@/shared/validation-schemas/validation-schemas";

import styles from "./styles.module.scss";

const SignUpForm = () => {
  const router = useRouter();

  const { signUp, isLoading } = useAuthStore();
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

    try {
      await signUp(user);
      if (useAuthStore.getState().isAuthenticated) {
        toast.success("Регістрація успішна");
        router.push("/");
      }
    } catch {
      toast.error("Регістрація не вдалася");
      setFormError("Помилка входу. Перевірте дані.");
    }
  };

  return (
    <Form
      className={styles.form}
      onSubmit={handleSubmit(handleFormSubmit)}
      action={""}
    >
      {formError && (
        <p style={{ color: "red" }}>
          {typeof formError === "string"
            ? formError
            : JSON.stringify(formError)}
        </p>
      )}
      <div className={styles.input_wrapper}>
        <Input
          name="email"
          type={InputType.EMAIL}
          label="E-mail"
          placeholder="E-mail address"
          control={control}
          errors={errors}
          inputClassName={styles.input_pages}
        />
      </div>
      <div className={styles.input_wrapper}>
        <Input
          name="password"
          type={InputType.PASSWORD}
          label="Password"
          placeholder="Password"
          control={control}
          errors={errors}
          inputClassName={styles.input_pages}
        />
      </div>
      <div className={styles.input_wrapper}>
        <Input
          name="firstName"
          type={InputType.TEXT}
          label="First Name"
          placeholder="First Name"
          control={control}
          errors={errors}
          inputClassName={styles.input_pages}
        />
      </div>
      <div className={styles.input_wrapper}>
        <Input
          name="lastName"
          type={InputType.TEXT}
          label="Last Name"
          placeholder="Last Name"
          control={control}
          errors={errors}
          inputClassName={styles.input_pages}
        />
      </div>
      <div className={styles.input_wrapper}>
        <Input
          name="age"
          type={InputType.NUMBER}
          label="Age"
          placeholder="Age"
          control={control}
          errors={errors}
          inputClassName={styles.input_pages}
        />
      </div>
      <div className={styles.input_wrapper}>
        <Input
          name="phone"
          type={InputType.TEXT}
          label="Number"
          placeholder="Number"
          control={control}
          errors={errors}
          inputClassName={styles.input_pages}
        />
      </div>
      <div className={styles.input_wrapper}>
        <Input
          name="image"
          type={InputType.FILE}
          label="Image"
          placeholder="Image"
          control={control}
          errors={errors}
          inputClassName={styles.input_pages}
        />
      </div>
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
