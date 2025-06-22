"use client";

import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { toast } from "react-toastify";
import React, { useState } from "react";
import styles from "@/features/password/components/styles.module.scss";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/Button";
import { InputType } from "@/components/ui/input/input-type/input-type.enum";
import { ButtonType } from "@/components/ui/button/button-type/button-type.enum";
import {updatePasswordSchema} from "@/shared/validation-schemas/update-password.validation-schema";
import {userApi} from "@/user/user/user-api/userApi";
import {useRouter} from "next/navigation";

interface UpdatePasswordFormFields {
    lostPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const UpdatePasswordForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<UpdatePasswordFormFields>({
        defaultValues: {
            lostPassword: "",
            newPassword: "",
            confirmPassword: "",
        },
        resolver: joiResolver(updatePasswordSchema),
    });

    const router = useRouter();

    const onSubmit = async (data: UpdatePasswordFormFields) => {
        setIsLoading(true);
        try {
            await userApi.updatePassword({
                lostPassword: data.lostPassword,
                newPassword: data.newPassword,
            });
            toast.success("Пароль успішно оновлено");
            router.push("/");
        } catch (e) {
            toast.error("Не вдалося оновити пароль. Перевірте старий пароль");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.password_container}>
            <div className={styles.title}>Оновлення пароля</div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.input_wrapper}>
                    <Input
                        type={InputType.PASSWORD}
                        label="Введіть старий пароль"
                        placeholder="Старий пароль"
                        control={control}
                        errors={errors}
                        name="lostPassword"
                        inputClassName={styles.input_pages}
                    />
                </div>

                <div className={styles.input_wrapper}>
                    <Input
                        type={InputType.PASSWORD}
                        label="Введіть новий пароль"
                        placeholder="Новий пароль"
                        control={control}
                        errors={errors}
                        name="newPassword"
                        inputClassName={styles.input_pages}
                    />
                </div>

                <div className={styles.input_wrapper}>
                    <Input
                        type={InputType.PASSWORD}
                        label="Повторіть новий пароль"
                        placeholder="Підтвердіть новий пароль"
                        control={control}
                        errors={errors}
                        name="confirmPassword"
                        inputClassName={styles.input_pages}
                    />
                </div>

                <Button
                    type={ButtonType.SUBMIT}
                    className={styles.form_button}
                    disabled={isLoading}
                >
                    {isLoading ? "Оновлення..." : "Оновити пароль"}
                </Button>
            </form>
        </div>
    );
};

export default UpdatePasswordForm;
