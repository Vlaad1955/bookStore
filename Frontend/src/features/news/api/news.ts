import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";

export const newsApi = {
  getNewsList: (params: {
    title?: string;
    category?: "general" | "promotion" | "event";
    sort?: string;
    order?: "ASC" | "DESC";
    page?: number;
    limit?: number;
  }) => axiosInstance.get("/news/list", { params }),
};
