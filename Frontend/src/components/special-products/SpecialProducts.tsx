import React from "react";
import SpecialProductsList from "./SpecialProductsList";
import { getCategoryList } from "@/features/categories/api/categoryApi";
import { cleanParams } from "@/shared/utils/cleanParams";
import { getBooksInOneCategory } from "@/features/books/api/booksApi";

interface SpecialProductsProps {
  categoryName: string;
}

export default async function SpecialProducts({
  categoryName,
}: SpecialProductsProps) {
  try {
    const categoryData = await getCategoryList({});
    const allCategories = categoryData.entities || [];

    const targetCategory = allCategories.find(
      (cat: { name: string }) =>
        cat.name.toLowerCase() === categoryName.toLowerCase()
    );

    if (!targetCategory) {
      console.warn(`Категорію "${categoryName}" не знайдено`);
      return null;
    }

    const filters = cleanParams({
      categories: targetCategory.id,
      limit: 10,
      published: "true",
    });

    const data = await getBooksInOneCategory(filters);
    const books = data.entities || [];

    return (
      <SpecialProductsList
        books={books}
        categoryName={categoryName}
        categoryId={targetCategory.id}
      />
    );
  } catch (err) {
    console.error("Помилка при завантаженні SpecialProducts:", err);
    return null;
  }
}
