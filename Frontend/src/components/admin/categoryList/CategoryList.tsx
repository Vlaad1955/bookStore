"use client";

import React, { useState } from "react";
import CategoryCard from "@/components/admin/categoryCard/CategoryCard";

interface Category {
    id: string;
    name: string;
    parentId: string | null;
}

interface CategoryListProps {
    category: Category[];    // Всі категорії
    main: Category[];        // Головні категорії
}

const CategoryList: React.FC<CategoryListProps> = ({ category, main }) => {
    const [categories, setCategories] = useState<Category[]>(category);

    // Оновлення категорії у списку
    const handleUpdateCategory = (updatedCategory: Category) => {
        setCategories(prev =>
            prev.map(cat => (cat.id === updatedCategory.id ? updatedCategory : cat))
        );
    };

    // Видалення категорії зі списку
    const handleDeleteCategory = (id: string) => {
        setCategories(prev => prev.filter(cat => cat.id !== id));
    };

    return (
        <div>
            {categories.map(cat => (
                <CategoryCard
                    key={cat.id}
                    category={cat}
                    type={cat.parentId ? "sub" : "main"}
                    main={main}
                    onUpdateCategory={handleUpdateCategory}
                    onDeleteCategory={handleDeleteCategory}  // Додали функцію видалення
                />
            ))}
        </div>
    );
};

export default CategoryList;
