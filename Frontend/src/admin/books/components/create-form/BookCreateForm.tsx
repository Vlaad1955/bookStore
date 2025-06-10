"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreateBookDto } from "@/features/books/types/book";
import styles from "@/admin/books/components/edit-form/styles.module.scss";
import { createBook } from "@/admin/books/api/books";
import ConfirmModal from "@/components/ui/modal/modal-admin/ConfirmModal";

const CreateBookForm = ({
  categories,
}: {
  categories: { id: string; name: string }[];
}) => {
  const router = useRouter();

  const [form, setForm] = useState<CreateBookDto>({
    title: "",
    price: 0,
    gift: false,
    cover: "soft",
    categories: [],
    description: "",
    author: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "gift") {
      setForm((prev) => ({ ...prev, gift: checked }));
    } else if (name === "price") {
      setForm((prev) => ({ ...prev, price: parseFloat(value) || 0 }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleCategoryChange = (id: string) => {
    setForm((prev) => {
      const exists = prev.categories.includes(id);
      const newCategories = exists
        ? prev.categories.filter((cat) => cat !== id)
        : [...prev.categories, id];
      return { ...prev, categories: newCategories };
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleOpenModal = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title.trim() || !form.author.trim()) {
      alert("Заповніть назву та автора");
      return;
    }

    setIsModalOpen(true);
  };

  const handleConfirmCreate = async () => {
    setIsModalOpen(false);

    try {
      setIsSubmitting(true);

      const dto: CreateBookDto = {
        ...form,
        price: Number(form.price),
        gift: Boolean(form.gift),
        categories: form.categories.map(String),
      };

      await createBook(dto, imageFile);
      router.push("/admin/books/1");
    } catch (error) {
      console.error("Помилка створення книги:", error);
      alert("Не вдалося створити книгу. Спробуйте ще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleOpenModal}>
      <h2 className={styles.title}>Створити нову книгу</h2>

      <div className={styles.row}>
        <div className={styles.col}>
          <label htmlFor="title" className={styles.label}>
            Назва
          </label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Введіть назву"
            value={form.title}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.col}>
          <label htmlFor="author" className={styles.label}>
            Автор
          </label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="Ім’я автора"
            value={form.author}
            onChange={handleChange}
            className={styles.input}
          />
        </div>

        <div className={styles.col}>
          <label htmlFor="price" className={styles.label}>
            Ціна
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Вкажіть ціну"
            value={form.price}
            onChange={handleChange}
            className={styles.input}
            min="0"
            step="0.01"
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.col}>
          <label htmlFor="cover" className={styles.label}>
            Тип обкладинки
          </label>
          <select
            id="cover"
            name="cover"
            value={form.cover}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="soft">М’яка</option>
            <option value="firm">Тверда</option>
          </select>
        </div>

        <div className={styles.colCheckbox}>
          <input
            type="checkbox"
            id="gift"
            name="gift"
            checked={form.gift}
            onChange={handleChange}
            className={styles.checkbox}
          />
          <label htmlFor="gift" className={styles.checkboxLabel}>
            Подарункове видання
          </label>
        </div>
      </div>

      <div className={styles.fieldGroupFull}>
        <label htmlFor="categories" className={styles.label}>
          Категорії
        </label>
        <div className={styles.checkboxList}>
          {categories.map((cat) => (
            <div key={cat.id} className={styles.checkboxItem}>
              <input
                type="checkbox"
                id={cat.id}
                checked={form.categories.includes(cat.id)}
                onChange={() => handleCategoryChange(cat.id)}
                className={styles.checkbox}
              />
              <label htmlFor={cat.id} className={styles.checkboxLabel}>
                {cat.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.fieldGroupFull}>
        <label htmlFor="description" className={styles.label}>
          Опис
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Введіть опис"
          value={form.description}
          onChange={handleChange}
          className={styles.textarea}
        />
      </div>

      <div className={styles.rowLarge}>
        <div className={styles.colLarge}>
          <label htmlFor="image" className={styles.label}>
            Зображення
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
          {preview && (
            <div className={styles.imagePreview}>
              <img src={preview} alt="Прев’ю" />
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
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
