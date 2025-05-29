"use client";

import React, { useState } from "react";
import { updateCategory, deleteCategory } from "@/shared/api/category/category-api";
import {UpdateCategoryDto} from "@/shared/types/categoryTypes/category";

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
    onDeleteCategory: (id: string) => void;   // Новий пропс
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, type, main, onUpdateCategory, onDeleteCategory }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(category.name);
    const [newParentId, setNewParentId] = useState(category.parentId || "");

    const handleSave = async () => {
        try {
            const dto: UpdateCategoryDto = {
                name: newName,
                parentId: newParentId || null,
            };
            const updatedData = await updateCategory(category.id, dto);
            onUpdateCategory(updatedData); // Оновлюємо стан у списку
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
            onDeleteCategory(category.id);  // Видаляємо зі списку
        } catch (error) {
            console.error("Помилка видалення категорії", error);
            alert("Помилка видалення категорії");
        }
    };

    return (
        <div style={{
            border: "1px solid black",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "5px"
        }}>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={newName}
                        onChange={e => setNewName(e.target.value)}
                        placeholder="Нове ім'я"
                    />
                    <select
                        value={newParentId}
                        onChange={e => setNewParentId(e.target.value)}
                    >
                        <option value="">Виберіть категорію</option>
                        {main.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleSave}>Зберегти</button>
                    <button onClick={() => setIsEditing(false)}>Скасувати</button>
                </>
            ) : (
                <>
                    <h3>{category.name}</h3>
                    {type === "main" ? (
                        <>
                            <p>Тип: Категорія</p>
                            <button>Редагувати</button>
                            <button>Додати підкатегорію</button>
                        </>
                    ) : (
                        <>
                            <p>Тип: Підкатегорія {main.find(cat => cat.id === category.parentId)?.name || "Невідома категорія"}</p>
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
