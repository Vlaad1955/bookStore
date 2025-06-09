import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";

interface GetCommentsParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "ASC" | "DESC";
  book_id?: string;
  user_id?: string;
}
export const createComment = async (bookId: string, text: string) => {
  const response = await axiosInstance.post("/comments/create-comment", {
    book_id: bookId,
    text,
  });

  return response.data;
};

export const getComments = async (params?: GetCommentsParams) => {
  const response = await axiosInstance.get("/comments/list", {
    params,
  });

  return response.data;
};

export const getCommentById = async (id: string) => {
  const response = await axiosInstance.get(`/comments/find/${id}`);
  return response.data;
};

export const updateComment = async (id: string, newText: string) => {
  const response = await axiosInstance.patch(`/comments/update/${id}`, {
    text: newText,
  });

  return response.data;
};

export const deleteComment = async (id: string) => {
  const response = await axiosInstance.delete(`/comments/delete/${id}`);
  return response.data;
};
