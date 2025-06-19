import { create } from "zustand";
import { Comment } from "@/features/comments/types/comments";

interface CommentStore {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  deleteComment: (id: string) => void;
  updateComment: (id: string, text: string) => void;
}

export const useCommentStore = create<CommentStore>((set) => ({
  comments: [],
  setComments: (comments) => set({ comments }),
  addComment: (comment) =>
    set((state) => ({ comments: [comment, ...state.comments] })),
  deleteComment: (id) =>
    set((state) => ({
      comments: state.comments.filter((comment) => comment.id !== id),
    })),
  updateComment: (id, text) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === id ? { ...comment, text } : comment
      ),
    })),
}));
