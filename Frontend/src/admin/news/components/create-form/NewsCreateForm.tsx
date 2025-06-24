"use client";

import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createNewsSchema } from "@/shared/validation-schemas/create-news.validation-schema";
import { createNews } from "@/admin/news/api/news";
import styles from "@/admin/news/components/edit-form/styles.module.scss";

interface FormFields {
    title: string;
    content: string;
    category: "general" | "promotion" | "event";
}

export default function CreateNewsForm() {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [submitError, setSubmitError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormFields>({
        resolver: joiResolver(createNewsSchema),
        defaultValues: {
            title: "",
            content: "",
            category: "general",
        },
    });

    useEffect(() => {
        if (!image) {
            setImagePreview(null);
            return;
        }

        const objectUrl = URL.createObjectURL(image);
        setImagePreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [image]);

    const onSubmit = async (data: FormFields) => {
        setSubmitError("");

        if (!image) {
            setSubmitError("Зображення обов'язкове");
            return;
        }

        try {
            await createNews(data, image);
            router.push("/admin/news/1");
        } catch (err: any) {
            setSubmitError(err.response?.data?.message || "Помилка при створенні новини");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <h2 className={styles.title}>Створити новину</h2>

            {submitError && <p className={styles.error}>{submitError}</p>}

            <input
                type="text"
                placeholder="🖉 Заголовок"
                {...register("title")}
                className={styles.input}
            />
            {errors.title && <p className={styles.error}>{errors.title.message}</p>}

            <textarea
                placeholder="🖉 Контент"
                {...register("content")}
                className={styles.textarea}
            />
            {errors.content && <p className={styles.error}>{errors.content.message}</p>}

            <select {...register("category")} className={styles.input}>
                <option value="general">Загальна</option>
                <option value="promotion">Акція</option>
                <option value="event">Подія</option>
            </select>
            {errors.category && <p className={styles.error}>{errors.category.message}</p>}

            <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className={styles.file}
            />

            {imagePreview && (
                <div className={styles.previewContainer}>
                    <p className={styles.previewLabel}>Прев’ю зображення:</p>
                    <Image
                        src={imagePreview}
                        alt="Прев’ю"
                        className={styles.previewImage}
                        width={750}
                        height={750}
                    />
                </div>
            )}

            <button type="submit" className={styles.submitButton}>
                Створити
            </button>
        </form>
    );
}
