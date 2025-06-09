import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";
import {
  CreateCategoryDto,
  FetchCategoriesOptions,
  UpdateCategoryDto,
} from "@/features/categories/types/category";

// Створення категорії
export async function createCategory(dto: CreateCategoryDto) {
  const response = await axiosInstance.post("/category/create", dto);
  return response.data;
}

export async function makeCategoryListRequest(queryString: string) {
  const response = await axiosInstance.get(`/category/list?${queryString}`);
  return response.data;
}

// Отримати список категорій з query параметрами
export async function getCategoryList(queryParams: FetchCategoriesOptions) {
  const response = await axiosInstance.get("/category/list", {
    params: queryParams,
  });
  return response.data;
}

// Отримати категорію за ID
export async function getCategoryById(id: string) {
  const response = await axiosInstance.get(`/category/find/id/${id}`);
  return response.data;
}

// Оновлення категорії за ID
export async function updateCategory(id: string, dto: UpdateCategoryDto) {
  const response = await axiosInstance.patch(`/category/update/${id}`, dto);
  return response.data;
}

// Видалення категорії за ID
export async function deleteCategory(id: string) {
  const response = await axiosInstance.delete(`/category/delete/${id}`);
  return response.data;
}

export async function getMainCategories() {
  const response = await axiosInstance.get(`/category/mainCategories/list`);
  return response.data;
}
