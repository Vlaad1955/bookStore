"use client";

import React, { useEffect, useState } from "react";
import { updateCategory, deleteCategory, createCategory } from "@/shared/api/category/category-api";
import { UpdateCategoryDto, CreateCategoryDto } from "@/shared/types/categoryTypes/category";

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

            // Оновлюємо локальний стан на основі введених значень
            onUpdateCategory({
                ...category,
                name: newName,
                parentId: dto.parentId,
            });

            setIsEditing(false);
        } catch (error) {
            console.error("Помилка оновлення категорії", error);
            alert("Помилка оновлення категорії");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Ви впевнені, що хочете видалити цю категорію?")) return;
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
        <div
            style={{
                border: "1px solid black",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
            }}
        >
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Нове ім'я"
                    />
                    {type === "sub" && (
                        <select value={newParentId} onChange={(e) => setNewParentId(e.target.value)}>
                            <option value="">Виберіть категорію</option>
                            {main.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    )}
                    <button onClick={handleSave}>Зберегти</button>
                    <button onClick={() => setIsEditing(false)}>Скасувати</button>
                </>
            ) : (
                <>
                    <h3>{category.name}</h3>
                    {type === "main" ? (
                        <>
                            <p>Тип: Категорія</p>
                            <button onClick={() => setIsEditing(true)}>Редагувати</button>
                            <button onClick={() => setAddingSubCat(!addingSubCat)}>
                                {addingSubCat ? "Відмінити" : "Додати підкатегорію"}
                            </button>
                            {addingSubCat && (
                                <div style={{ marginTop: 10 }}>
                                    <input
                                        type="text"
                                        value={subCatName}
                                        onChange={(e) => setSubCatName(e.target.value)}
                                        placeholder="Введіть назву підкатегорії"
                                    />
                                    <button onClick={handleAddSubCategory}>Додати</button>
                                </div>
                            )}
                        </>
                    ) : (
                        <>
                            <p>
                                Тип: Підкатегорія{" "}
                                {main.find((cat) => cat.id === category.parentId)?.name || "Невідома категорія"}
                            </p>
                            <button onClick={() => setIsEditing(true)}>Редагувати</button>
                            <button onClick={handleDelete}>Видалити</button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default CategoryCard;
