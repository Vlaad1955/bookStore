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
import ConfirmModal from "@/components/ui/modalAdmin/ConfirmModal";

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

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"delete" | "save" | "category">("delete");

    useEffect(() => {
        setNewName(category.name);
        setNewParentId(category.parentId || "");
    }, [category.name, category.parentId]);

    const openModal = (type: "delete" | "save" | "category") => {
        setModalType(type);
        setIsModalOpen(true);
    };

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
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteCategory(category.id);
            onDeleteCategory(category.id);
        } catch (error) {
            console.error("Помилка видалення категорії", error);
            alert("Помилка видалення категорії");
        } finally {
            setIsModalOpen(false);
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
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleModalConfirm = () => {
        if (modalType === "delete") return handleConfirmDelete();
        if (modalType === "save") return handleSave();
        if (modalType === "category") return handleAddSubCategory();
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
                            <select value={newParentId} onChange={(e) => setNewParentId(e.target.value)}>
                                <option value="">Виберіть категорію</option>
                                {main.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        )}
                        <div className={styles.cardButtons}>
                            <Button className={styles.button} onClick={() => openModal("save")}>
                                Зберегти
                            </Button>
                            <Button className={styles.cancel} onClick={() => setIsEditing(false)}>
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
                                : `Підкатегорія: ${main.find((cat) => cat.id === category.parentId)?.name || "Невідома"}`}
                        </div>
                        <div className={styles.cardButtons}>
                            <Button className={styles.button} onClick={() => setIsEditing(true)}>
                                Редагувати
                            </Button>
                            {type === "main" ? (
                                <>
                                    <Button className={styles.button} onClick={() => setAddingSubCat(!addingSubCat)}>
                                        {addingSubCat ? "Скасувати" : "Додати підкатегорію"}
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
                                                onClick={() => openModal("category")}
                                            >
                                                Додати
                                            </Button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <Button
                                    className={`${styles.button} ${styles.cancel}`}
                                    onClick={() => openModal("delete")}
                                >
                                    Видалити
                                </Button>
                            )}
                        </div>
                    </>
                )}
            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                message={modalType}
                onConfirm={handleModalConfirm}
                onCancel={() => setIsModalOpen(false)}
                title="Підтвердження дії"
            />
        </div>
    );
};

export default CategoryCard;
