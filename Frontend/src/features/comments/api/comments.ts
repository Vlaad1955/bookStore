import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";
import { retryAsync } from "@/shared/hooks/retry/useRetry.hook";

interface GetCommentsParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "ASC" | "DESC";
  book_id?: string;
  user_id?: string;
}
export const createComment = (bookId: string, text: string) => {
  return retryAsync(() =>
    axiosInstance
      .post("/comments/create-comment", { book_id: bookId, text })
      .then((res) => res.data)
  );
};

export const getComments = (params?: GetCommentsParams) => {
  return retryAsync(() =>
    axiosInstance.get("/comments/list", { params }).then((res) => res.data)
  );
};

export const getCommentById = (id: string) => {
  return retryAsync(() =>
    axiosInstance.get(`/comments/find/${id}`).then((res) => res.data)
  );
};

export const updateComment = (id: string, newText: string) => {
  return retryAsync(() =>
    axiosInstance
      .patch(`/comments/update/${id}`, { text: newText })
      .then((res) => res.data)
  );
};

export const deleteComment = (id: string) => {
  return retryAsync(() =>
    axiosInstance.delete(`/comments/delete/${id}`).then((res) => res.data)
  );
};
