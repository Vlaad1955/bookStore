import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";
import {News, UpdateNewsDto} from "@/shared/types/newsATypes/news";

export async function getAllNews(queryParams: unknown) {
    const response = await axiosInstance.get("/news/list", {
        params: queryParams,
    });
    return response.data;
}

export async function getOneNews(id: string) {
    const response = await axiosInstance.get(`/news/find/id/${id}`);
    return response.data;
}

export async function createNews(newsData: News, imageFile: File) {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", newsData.title);
    formData.append("content", newsData.content);
    formData.append("category", newsData.category);

    const response = await axiosInstance.post("/news/create", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export async function updateNews(id: string, newsData:UpdateNewsDto) {
    const response = await axiosInstance.patch(`/news/update/${id}`, newsData);
    return response.data;
}

export async function removeNews(id: string) {
    const response = await axiosInstance.delete(`/news/delete/${id}`);
    return response.data;
}