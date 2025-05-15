"use client";

import React, { useState } from "react";
import { News, UpdateNewsDto } from "@/shared/types/newsATypes/news";
import { updateNews } from "@/shared/admin/news/news-api";
import { useRouter } from "next/navigation";
import styles from "./EditNewsForm.module.css";

export default function EditNewsForm({ news }: { news: News }) {
    const [title, setTitle] = useState(news.title);
    const [content, setContent] = useState(news.content);
    const [category, setCategory] = useState(news.category);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedData: UpdateNewsDto = { title, content, category };

        try {
            setIsSubmitting(true);
            await updateNews(news.id, updatedData);
            alert("Новину оновлено!");
            router.push("/admin/news/1");
        } catch (error) {
            console.error("Помилка оновлення:", error);
            alert("Не вдалося оновити новину.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.heading}>Редагувати новину</h2>

            <div className={styles.formGroup}>
                <label htmlFor="title">🖉 Заголовок</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="content">🖉 Зміст</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={6}
                    className={styles.textarea}
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="category">Категорія</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value as UpdateNewsDto["category"])}
                    className={styles.input}
                >
                    <option value="general">Загальна</option>
                    <option value="event">Подія</option>
                    <option value="promotion">Акція</option>
                </select>
            </div>

            <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                {isSubmitting ? "Оновлення..." : "Оновити"}
            </button>
        </form>
    );
}
