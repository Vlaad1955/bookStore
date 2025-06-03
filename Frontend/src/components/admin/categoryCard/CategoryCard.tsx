"use client";

import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import {
  updateCategory,
  deleteCategory,
  createCategory,
} from "@/shared/api/category/category-api";
import {
  UpdateCategoryDto,
  CreateCategoryDto,
} from "@/shared/types/categoryTypes/category";
import { Button } from "@/components/ui/button/Button";

interface Category {
  id: string;
  name: string;
  parentId: string | null;
}

interface CategoryCardProps {
  category: Category;
  type: "main" | "sub";
  main: Category[];
  onUpdateCategory: (updatedCategory: Category) => void;
  onDeleteCategory: (id: string) => void;
  onAddSubCategory: (newCategory: Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  type,
  main,
  onUpdateCategory,
  onDeleteCategory,
  onAddSubCategory,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(category.name);
  const [newParentId, setNewParentId] = useState(category.parentId || "");
  const [addingSubCat, setAddingSubCat] = useState(false);
  const [subCatName, setSubCatName] = useState("");

  useEffect(() => {
    setNewName(category.name);
    setNewParentId(category.parentId || "");
  }, [category.name, category.parentId]);

  const handleSave = async () => {
    try {
      const dto: UpdateCategoryDto = {
        name: newName,
        parentId: type === "main" ? null : newParentId || null,
      };

      await updateCategory(category.id, dto);
      onUpdateCategory({ ...category, name: newName, parentId: dto.parentId });
      setIsEditing(false);
    } catch (error) {
      console.error("Помилка оновлення категорії", error);
      alert("Помилка оновлення категорії");
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Ви впевнені, що хочете видалити цю категорію?"))
      return;
    try {
      await deleteCategory(category.id);
      onDeleteCategory(category.id);
    } catch (error) {
      console.error("Помилка видалення категорії", error);
      alert("Помилка видалення категорії");
    }
  };

  const handleAddSubCategory = async () => {
    if (!subCatName.trim()) {
      alert("Введіть назву підкатегорії");
      return;
    }
    try {
      const dto: CreateCategoryDto = {
        name: subCatName.trim(),
        parentId: category.id,
      };
      const newCategory = await createCategory(dto);
      onAddSubCategory(newCategory);
      setSubCatName("");
      setAddingSubCat(false);
    } catch (error) {
      console.error("Помилка додавання підкатегорії", error);
      alert("Помилка додавання підкатегорії");
    }
  };

  return (
    <div className={styles.categoryCard}>
      <div className={styles.cardContent}>
        {isEditing ? (
          <>
            <input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Нове ім'я"
            />
            {type === "sub" && (
              <select
                value={newParentId}
                onChange={(e) => setNewParentId(e.target.value)}
              >
                <option value="">Виберіть категорію</option>
                {main.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            )}
            <div className={styles.cardButtons}>
              <Button className={styles.button} onClick={handleSave}>
                Зберегти
              </Button>
              <Button
                className={`${styles.cancel}`}
                onClick={() => setIsEditing(false)}
              >
                Скасувати
              </Button>
            </div>
          </>
        ) : (
          <>
            <h3 className={styles.cardTitle}>{category.name}</h3>
            <div className={styles.cardType}>
              {type === "main"
                ? "Категорія"
                : `Підкатегорія: ${
                    main.find((cat) => cat.id === category.parentId)?.name ||
                    "Невідома"
                  }`}
            </div>
            <div className={styles.cardButtons}>
              <Button
                className={styles.button}
                onClick={() => setIsEditing(true)}
              >
                Редагувати
              </Button>
              {type === "main" ? (
                <>
                  <Button
                    className={`${styles.button}`}
                    onClick={() => setAddingSubCat(!addingSubCat)}
                  >
                    {addingSubCat ? (
                      <div className={styles.cancel}>Скасувати</div>
                    ) : (
                      "Додати підкатегорію"
                    )}
                  </Button>
                  {addingSubCat && (
                    <div className={styles.inputGroup}>
                      <input
                        value={subCatName}
                        onChange={(e) => setSubCatName(e.target.value)}
                        placeholder="Назва підкатегорії"
                      />
                      <Button
                        className={`${styles.button} ${styles.addSub}`}
                        onClick={handleAddSubCategory}
                      >
                        Додати
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <Button
                  className={`${styles.button} ${styles.cancel}`}
                  onClick={handleDelete}
                >
                  Видалити
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
