"use client";

import React, {useEffect, useState} from "react";
import {useForm, Controller} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {updateBook} from "@/admin/books/api/books";
import {makeCategoryListRequest} from "@/features/categories/api/category";
import ConfirmModal from "@/components/ui/modal/modal-admin/ConfirmModal";
import {createBookSchema} from "@/shared/validation-schemas/create-book.validation-schema";
import {Book, UpdateBookDto} from "@/features/books/types/book";
import styles from "./styles.module.scss"

interface Category {
    id: string;
    name: string;
    parentId: string | null;
}

type FormFields = UpdateBookDto;

export default function EditBookForm({book}: { book: Book }) {
    const router = useRouter();
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const {
        handleSubmit,
        control,
        getValues,
        setValue,
        formState: {errors},
    } = useForm<FormFields>({
        resolver: joiResolver(createBookSchema),
        defaultValues: {
            title: book.title,
            author: book.author,
            price: book.price,
            description: book.description,
            gift: book.gift,
            cover: book.cover as "soft" | "firm",
            categories: book.categories?.map((c) => c.id) || [],
        },
    });

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

    const handleCategoryChange = (id: string) => {
        const current = getValues("categories") || [];
        const updated = current.includes(id)
            ? current.filter((cid) => cid !== id)
            : [...current, id];
        setValue("categories", updated, {shouldValidate: true});
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = () => setIsModalOpen(true);

    const handleConfirm = async () => {
        try {
            setIsSubmitting(true);
            const values = getValues();
            await updateBook(String(book.id), values, imageFile);
            router.push("/admin/books/1");
        } catch (error) {
            console.error("Помилка оновлення:", error);
            alert("Не вдалося оновити книгу.");
        } finally {
            setIsSubmitting(false);
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <ConfirmModal
                isOpen={isModalOpen}
                message="Ви впевнені, що хочете зберегти зміни?"
                onConfirm={handleConfirm}
                onCancel={() => setIsModalOpen(false)}
            />

            <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                <h2 className={styles.title}>Редагувати книгу</h2>

                <div className={styles.row}>
                    <div className={styles.col}>
                        <label className={styles.label}>Назва</label>
                        <Controller
                            name="title"
                            control={control}
                            render={({field}) => (
                                <input {...field} className={styles.input} placeholder="Введіть назву книги"/>
                            )}
                        />
                        {errors.title && <p className={styles.error}>{errors.title.message}</p>}
                    </div>

                    <div className={styles.col}>
                        <label className={styles.label}>Автор</label>
                        <Controller
                            name="author"
                            control={control}
                            render={({field}) => (
                                <input {...field} className={styles.input} placeholder="Ім'я автора"/>
                            )}
                        />
                    </div>

                    <div className={styles.col}>
                        <label className={styles.label}>Ціна</label>
                        <Controller
                            name="price"
                            control={control}
                            render={({field}) => (
                                <input {...field} type="number" className={styles.input} placeholder="Вкажіть ціну"/>
                            )}
                        />
                        {errors.price && <p className={styles.error}>{errors.price.message}</p>}
                    </div>
                </div>

                <div className={styles.row}>
                    <div className={styles.col}>
                        <label className={styles.label}>Обкладинка</label>
                        <Controller
                            name="cover"
                            control={control}
                            render={({field}) => (
                                <select {...field} className={styles.select}>
                                    <option value="soft">М’яка</option>
                                    <option value="firm">Тверда</option>
                                </select>
                            )}
                        />
                    </div>

                    <div className={styles.colCheckbox}>
                        <Controller
                            name="gift"
                            control={control}
                            render={({field}) => (
                                <>
                                    <input
                                        type="checkbox"
                                        checked={field.value}
                                        onChange={(e) => field.onChange(e.target.checked)}
                                        className={styles.checkbox}
                                    />
                                    <label className={styles.checkboxLabel}>Подарункове видання</label>
                                </>
                            )}
                        />
                    </div>
                </div>

                <div className={styles.rowLarge}>
                    <div className={styles.colLarge}>
                        <label className={styles.label}>Опис</label>
                        <Controller
                            name="description"
                            control={control}
                            render={({field}) => (
                                <textarea {...field} className={styles.textarea} placeholder="Опис книги"/>
                            )}
                        />
                    </div>
                </div>

                <div className={styles.fieldGroupFull}>
                    <label className={styles.label}>Категорії</label>
                    <div className={styles.checkboxList}>
                        {allCategories.map((cat) => (
                            <div key={cat.id} className={styles.checkboxItem}>
                                <input
                                    type="checkbox"
                                    checked={(getValues("categories") || []).includes(cat.id)}
                                    onChange={() => handleCategoryChange(cat.id)}
                                    className={styles.checkbox}
                                />
                                <label className={styles.checkboxLabel}>{cat.name}</label>
                            </div>
                        ))}
                    </div>
                    {errors.categories && <p className={styles.error}>{errors.categories.message}</p>}
                </div>

                <div className={styles.rowLarge}>
                    <div className={styles.colLarge}>
                        <label className={styles.label}>Зображення (опціонально)</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className={styles.fileInput}
                        />
                        {preview && (
                            <div className={styles.imagePreview}>
                                <Image src={preview} alt="Прев’ю" width={750} height={750}/>
                            </div>
                        )}
                    </div>
                </div>

                <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
                    {isSubmitting ? "Оновлення..." : "Оновити"}
                </button>
            </form>
        </>
    );
}