import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";

// Отримати всі новини з фільтрацією (через параметри)
export async function getAllNews(queryParams: any) {
    const response = await axiosInstance.get("/news/list", {
        params: queryParams,
    });
    return response.data;
}

// Отримати одну новину за ID
export async function getOneNews(id: string) {
    const response = await axiosInstance.get(`/news/find/id/${id}`);
    return response.data;
}

// Створити новину
export async function createNews(newsData, imageFile: File) {
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

// Оновити новину
export async function updateNews(id: string, newsData) {
    const response = await axiosInstance.patch(`/news/update/${id}`, newsData);
    return response.data;
}

// Видалити новину
export async function removeNews(id: string) {
    const response = await axiosInstance.delete(`/news/delete/${id}`);
    return response.data;
}