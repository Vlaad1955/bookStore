"use client";

import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ConfirmModal from "@/components/ui/modal/modal-admin/ConfirmModal";
import styles from "@/admin/books/components/edit-form/styles.module.scss";
import { createBook } from "@/admin/books/api/books";
import { CreateBookDto } from "@/features/books/types/book";
import { createBookSchema } from "@/shared/validation-schemas/create-book.validation-schema";

type FormFields = CreateBookDto;

const CreateBookForm = ({ categories }: { categories: { id: string; name: string }[] }) => {
    const router = useRouter();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        handleSubmit,
        control,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<FormFields>({
        resolver: joiResolver(createBookSchema),
        defaultValues: {
            title: "",
            author: "",
            price: 0,
            description: "",
            gift: false,
            cover: "soft",
            categories: [],
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleCategoryChange = (id: string) => {
        const current = getValues("categories");
        const newCategories = current.includes(id)
            ? current.filter((catId) => catId !== id)
            : [...current, id];
        setValue("categories", newCategories, { shouldValidate: true });
    };

    const onSubmit = () => setIsModalOpen(true);

    const handleConfirmCreate = async () => {
        setIsModalOpen(false);
        try {
            setIsSubmitting(true);
            const formData = getValues();
            await createBook(formData, imageFile);
            router.push("/admin/books/1");
        } catch (error) {
            alert("Не вдалося створити книгу. Спробуйте ще раз.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <h2 className={styles.title}>Створити нову книгу</h2>

            <div className={styles.row}>
                <div className={styles.col}>
                    <label className={styles.label}>Назва</label>
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <input {...field} className={styles.input} placeholder="Введіть назву" />
                        )}
                    />
                    {errors.title && <p className={styles.error}>{errors.title.message}</p>}
                </div>

                <div className={styles.col}>
                    <label className={styles.label}>Автор</label>
                    <Controller
                        name="author"
                        control={control}
                        render={({ field }) => (
                            <input {...field} className={styles.input} placeholder="Ім’я автора" />
                        )}
                    />
                </div>

                <div className={styles.col}>
                    <label className={styles.label}>Ціна</label>
                    <Controller
                        name="price"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="number"
                                className={styles.input}
                                placeholder="Вкажіть ціну"
                            />
                        )}
                    />
                    {errors.price && <p className={styles.error}>{errors.price.message}</p>}
                </div>
            </div>

            <div className={styles.row}>
                <div className={styles.col}>
                    <label className={styles.label}>Тип обкладинки</label>
                    <Controller
                        name="cover"
                        control={control}
                        render={({ field }) => (
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
                        render={({ field }) => (
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

            <div className={styles.fieldGroupFull}>
                <label className={styles.label}>Категорії</label>
                <div className={styles.checkboxList}>
                    {categories.map((cat) => (
                        <div key={cat.id} className={styles.checkboxItem}>
                            <input
                                type="checkbox"
                                checked={getValues("categories").includes(cat.id)}
                                onChange={() => handleCategoryChange(cat.id)}
                                className={styles.checkbox}
                            />
                            <label className={styles.checkboxLabel}>{cat.name}</label>
                        </div>
                    ))}
                </div>
                {errors.categories && <p className={styles.error}>{errors.categories.message}</p>}
            </div>

            <div className={styles.fieldGroupFull}>
                <label className={styles.label}>Опис</label>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <textarea {...field} className={styles.textarea} placeholder="Введіть опис" />
                    )}
                />
            </div>

            <div className={styles.rowLarge}>
                <div className={styles.colLarge}>
                    <label className={styles.label}>Зображення</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles.fileInput}
                    />
                    {preview && (
                        <div className={styles.imagePreview}>
                            <Image src={preview} alt="Прев’ю" width={750} height={750} />
                        </div>
                    )}
                </div>
            </div>

            <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? "Завантаження..." : "Створити"}
            </button>

            <ConfirmModal
                isOpen={isModalOpen}
                message="Ви впевнені, що хочете створити цю книгу?"
                onConfirm={handleConfirmCreate}
                onCancel={() => setIsModalOpen(false)}
            />
        </form>
    );
};

export default CreateBookForm;
