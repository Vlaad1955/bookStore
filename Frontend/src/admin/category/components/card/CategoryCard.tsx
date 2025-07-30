"use client";

import React, {useEffect, useState} from "react";
import styles from "./styles.module.scss";
import {
    updateCategory,
    deleteCategory,
    createCategory,
} from "@/features/categories/api/category";
import {
    UpdateCategoryDto,
    CreateCategoryDto,
} from "@/features/categories/types/category";
import {Button} from "@/components/ui/button/Button";
import ConfirmModal from "@/components/ui/modal/modal-admin/ConfirmModal";
import {toast} from "react-toastify";

interface Category {
    id: string;
    name: string;
    parentId: string | undefined;
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
    const [modalType, setModalType] = useState<"delete" | "save" | "category">(
        "delete"
    );

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
                parentId: type === "main" ? undefined : newParentId || undefined,
            };

            await updateCategory(category.id, dto);
            onUpdateCategory({...category, name: newName, parentId: dto.parentId});
            toast.success("Категорія оновлена.");
            setIsEditing(false);
        } catch (error) {
            console.error("Помилка оновлення категорії", error);
            toast.error("Помилка оновлення категорії");
        } finally {
            setIsModalOpen(false);
        }
    };

    const handleConfirmDelete = async () => {
        try {
            await deleteCategory(category.id);
            onDeleteCategory(category.id);
            toast.success("Категорія видалена.");
        } catch (error) {
            console.error("Помилка видалення категорії", error);
            toast.error("Помилка видалення категорії");
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
            toast.success("Категорія додана.");
            setAddingSubCat(false);
        } catch (error) {
            console.error("Помилка додавання підкатегорії", error);
            toast.error("Помилка додавання підкатегорії");
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
                            <Button
                                className={styles.button}
                                onClick={() => openModal("save")}
                            >
                                Зберегти
                            </Button>
                            <Button
                                className={styles.cancel}
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
                                        className={styles.button}
                                        onClick={() => setAddingSubCat(!addingSubCat)}
                                    >
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
