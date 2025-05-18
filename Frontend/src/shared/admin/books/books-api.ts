import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";
import {Book, CreateBookDto, UpdateBookDto, UpdatePublishedDto} from "@/shared/types/bookTypes/bookTypes";


export async function getAllBooks(queryParams: unknown) {
    const response = await axiosInstance.get("/books/list", {
        params: queryParams,
    });
    return response.data;
}

// Отримати одну книгу по ID
export async function getOneBook(id: string): Promise<Book> {
    const response = await axiosInstance.get(`/books/find/${id}`);
    return response.data;
}

// Створити книгу з обкладинкою
export async function createBook(bookData: CreateBookDto, imageFile: File) {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("title", bookData.title);
    formData.append("price", bookData.price.toString());
    formData.append("gift", String(bookData.gift));
    formData.append("cover", bookData.cover);
    formData.append("categories", JSON.stringify(bookData.categories));

    // Не обов’язкові поля
    if (bookData.description) {
        formData.append("description", bookData.description);
    }
    if (bookData.author) {
        formData.append("author", bookData.author);
    }

    const response = await axiosInstance.post("/books/create-book", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
}

// Оновити книгу (без зображення)
export async function updateBook(id: string, bookData: UpdateBookDto) {
    const response = await axiosInstance.patch(`/books/update/${id}`, bookData);
    return response.data;
}

// Оновити статус публікації
export async function updatePublishedStatus(id: string, dto: UpdatePublishedDto) {
    const response = await axiosInstance.put(`/books/published/${id}`, dto);
    return response.data;
}

// Видалити книгу
export async function removeBook(id: string) {
    const response = await axiosInstance.delete(`/books/delete/${id}`);
    return response.data;
}