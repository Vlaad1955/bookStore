"use client";

import React, { useState, useEffect, useRef, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Book, UpdateBookDto } from "@/shared/types/bookTypes/bookTypes";
import { updateBook } from "@/shared/admin/books/books-api";
import { makeCategoryListRequest } from "@/shared/api/category/category-api"; // ⚠️ переконайся, що шлях вірний
import styles from "./EditBookForm.module.css";

interface Category {
    id: string;
    name: string;
    parentId: string | null;
}

export default function EditBookForm({ book }: { book: Book }) {
    const [title, setTitle] = useState(book.title);
    const [price, setPrice] = useState(book.price);
    const [description, setDescription] = useState(book.description);
    const [author, setAuthor] = useState(book.author);
    const [image, setImage] = useState(book.image);
    const [previewImage, setPreviewImage] = useState(book.image);
    const [gift, setGift] = useState(book.gift);
    const [cover, setCover] = useState<"soft" | "firm" | "">((book.cover as "soft" | "firm") || "");
    const [categories, setCategories] = useState<string[]>(book.categories || []);
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    // 🔽 Завантаження категорій при завантаженні форми
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await makeCategoryListRequest("limit=1000");
                setAllCategories(data.entities || []);
            } catch (error) {
                console.error("Помилка отримання категорій:", error);
            }
        };

        fetchCategories();
    }, []);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImage(reader.result as string);
            setImage(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setCategories(selectedOptions);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedData: UpdateBookDto = {
            title,
            price,
            description,
            author,
            image,
            gift,
            cover,
            categories,
        };

        try {
            setIsSubmitting(true);
            await updateBook(book.id, updatedData);
            alert("Книгу оновлено!");
            router.push("/admin/books/1");
        } catch (error) {
            console.error("Помилка оновлення:", error);
            alert("Не вдалося оновити книгу.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.heading}>Редагувати книгу</h2>

            <div className={styles.formGroup}>
                <label>Назва</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className={styles.input} />
            </div>

            <div className={styles.formGroup}>
                <label>Ціна</label>
                <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className={styles.input} />
            </div>

            <div className={styles.formGroup}>
                <label>Опис</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className={styles.textarea} />
            </div>

            <div className={styles.formGroup}>
                <label>Автор</label>
                <input value={author} onChange={(e) => setAuthor(e.target.value)} className={styles.input} />
            </div>

            <div className={styles.formGroup}>
                <label>Фото обкладинки</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    className={styles.input}
                />
                {previewImage && (
                    <div className={styles.imagePreview}>
                        <img src={previewImage} alt="Прев’ю" />
                    </div>
                )}
            </div>

            <div className={styles.formGroup}>
                <label>Подарунок</label>
                <input type="checkbox" checked={gift} onChange={(e) => setGift(e.target.checked)} />
            </div>

            <div className={styles.formGroup}>
                <label>Обкладинка</label>
                <select value={cover} onChange={(e) => setCover(e.target.value as "soft" | "firm")} className={styles.input}>
                    <option value="">Виберіть тип</option>
                    <option value="soft">М’яка</option>
                    <option value="firm">Тверда</option>
                </select>
            </div>

            <div className={styles.formGroup}>
                <label>Категорії (оберіть кілька)</label>
                <select
                    multiple
                    value={categories}
                    onChange={handleCategoryChange}
                    className={styles.input}
                    size={5}
                >
                    {allCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                {isSubmitting ? "Оновлення..." : "Оновити"}
            </button>
        </form>
    );
}
