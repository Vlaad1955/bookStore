"use client";

import React, { useState, useEffect } from "react";
import CategoryCard from "@/components/admin/categoryCard/CategoryCard";

interface Category {
    id: string;
    name: string;
    parentId: string | null;
}

interface CategoryListProps {
    category: Category[];
    main: Category[];
}

const CategoryList: React.FC<CategoryListProps> = ({ category, main }) => {
    const [categories, setCategories] = useState<Category[]>(category);

    useEffect(() => {
        setCategories(category);
    }, [category]);

    const handleUpdateCategory = (updatedCategory: Category) => {
        setCategories((prev) =>
            prev.map((cat) => (cat.id === updatedCategory.id ? updatedCategory : cat))
        );
    };

    const handleDeleteCategory = (id: string) => {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
    };

    const handleAddSubCategory = (newCategory: Category) => {
        setCategories((prev) => [...prev, newCategory]);
    };

    return (
        <div>
            {categories.map((cat) => (
                <CategoryCard
                    key={cat.id}
                    category={cat}
                    type={cat.parentId ? "sub" : "main"}
                    main={main}
                    onUpdateCategory={handleUpdateCategory}
                    onDeleteCategory={handleDeleteCategory}
                    onAddSubCategory={handleAddSubCategory}
                />
            ))}
        </div>
    );
};

export default CategoryList;
