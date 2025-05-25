"use client";

import React, { useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { Book, UpdateBookDto } from "@/shared/types/bookTypes/bookTypes";
import { updateBook } from "@/shared/admin/books/books-api";
import { makeCategoryListRequest } from "@/shared/api/category/category-api";
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
    const [gift, setGift] = useState(book.gift);
    const [cover, setCover] = useState<"soft" | "firm" | "">((book.cover as "soft" | "firm") || "");
    const [categories, setCategories] = useState<string[]>(
        book.categories?.map((cat: { id: string }) => cat.id) || []
    );
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedData: UpdateBookDto = {
            title,
            price,
            description,
            author,
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
            <h2 className={styles.title}>Редагувати книгу</h2>

            <div className={styles.row}>
                <div className={styles.col}>
                    <label htmlFor="title" className={styles.label}>Назва</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={styles.input}
                        placeholder="Введіть назву книги"
                        required
                    />
                </div>

                <div className={styles.col}>
                    <label htmlFor="author" className={styles.label}>Автор</label>
                    <input
                        id="author"
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className={styles.input}
                        placeholder="Ім'я автора"
                        required
                    />
                </div>

                <div className={styles.col}>
                    <label htmlFor="price" className={styles.label}>Ціна</label>
                    <input
                        id="price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className={styles.input}
                        placeholder="Введіть ціну"
                        min={0}
                        required
                    />
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.col}>
                    <label htmlFor="cover" className={styles.label}>Обкладинка</label>
                    <select
                        id="cover"
                        value={cover}
                        onChange={(e) => setCover(e.target.value as "soft" | "firm")}
                        className={styles.select}
                        required
                    >
                        <option value="" disabled>Виберіть тип обкладинки</option>
                        <option value="soft">М’яка</option>
                        <option value="firm">Тверда</option>
                    </select>
                </div>

                <div className={styles.colCheckbox}>
                    <input
                        id="gift"
                        type="checkbox"
                        checked={gift}
                        onChange={(e) => setGift(e.target.checked)}
                        className={styles.checkbox}
                    />
                    <label htmlFor="gift" className={styles.checkboxLabel}>Подарункове видання</label>
                </div>
            </div>

            <div className={styles.rowLarge}>
                <div className={styles.colLarge}>
                    <label htmlFor="description" className={styles.label}>Опис</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.textarea}
                        placeholder="Опис книги"
                        required
                    />
                </div>
            </div>

            <div className={styles.fieldGroupFull}>
                <label className={styles.label}>Категорії (можна вибрати кілька)</label>
                <div className={styles.checkboxList}>
                    {allCategories.map((cat) => (
                        <div key={cat.id} className={styles.checkboxItem}>
                            <input
                                type="checkbox"
                                id={`category-${cat.id}`}
                                value={cat.id}
                                checked={categories.includes(cat.id)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setCategories((prev) => [...prev, cat.id]);
                                    } else {
                                        setCategories((prev) => prev.filter((id) => id !== cat.id));
                                    }
                                }}
                                className={styles.checkbox}
                            />
                            <label htmlFor={`category-${cat.id}`} className={styles.checkboxLabel}>
                                {cat.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                {isSubmitting ? "Оновлення..." : "Оновити"}
            </button>
        </form>
    );
}
