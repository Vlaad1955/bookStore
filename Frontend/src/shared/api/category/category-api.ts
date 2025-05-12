import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";

export async function makeCategoryListRequest(queryString: string) {
  const response = await axiosInstance.get(`/category/list?${queryString}`);
  return response.data;
}
