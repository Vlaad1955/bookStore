"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useRouter } from "next/navigation";
import { updateNewsSchema } from "@/shared/validation-schemas/update-news.validation-schema";
import { News, UpdateNewsDto } from "@/features/news/types/news";
import { updateNews } from "@/admin/news/api/news";
import styles from "./styles.module.scss";
import {toast} from "react-toastify";

export default function EditNewsForm({ news }: { news: News }) {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<UpdateNewsDto>({
        resolver: joiResolver(updateNewsSchema),
        defaultValues: {
            title: news.title,
            content: news.content,
            category: news.category,
        },
    });

    const onSubmit = async (data: UpdateNewsDto) => {
        try {
            await updateNews(news.id, data);
            toast.success("Новину оновлено!");
            router.push("/admin/news/1");
        } catch (error) {
            console.error("Помилка оновлення:", error);
            toast.error("Не вдалося оновити новину.");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2 className={styles.heading}>Редагувати новину</h2>

            <div className={styles.formGroup}>
                <label htmlFor="title">🖉 Заголовок</label>
                <input
                    id="title"
                    type="text"
                    {...register("title")}
                    className={styles.input}
                />
                {errors.title && <p className={styles.error}>{errors.title.message}</p>}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="content">🖉 Зміст</label>
                <textarea
                    id="content"
                    rows={6}
                    {...register("content")}
                    className={styles.textarea}
                />
                {errors.content && (
                    <p className={styles.error}>{errors.content.message}</p>
                )}
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="category">Категорія</label>
                <select
                    id="category"
                    {...register("category")}
                    className={styles.input}
                >
                    <option value="general">Загальна</option>
                    <option value="event">Подія</option>
                    <option value="promotion">Акція</option>
                </select>
                {errors.category && (
                    <p className={styles.error}>{errors.category.message}</p>
                )}
            </div>

            <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                {isSubmitting ? "Оновлення..." : "Оновити"}
            </button>
        </form>
    );
}
