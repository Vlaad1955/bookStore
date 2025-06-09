import { makeCategoryListRequest } from "../api/category";
import { FetchCategoriesOptions } from "../types/category";

export async function fetchCategories({
  page = 1,
  limit = 100,
  sort = "name",
  order = "ASC",
  parentId,
  name,
}: FetchCategoriesOptions = {}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
    sort,
    order,
  });

  if (parentId) params.append("parentId", parentId);
  if (name) params.append("name", name);

  return await makeCategoryListRequest(params.toString());
}
