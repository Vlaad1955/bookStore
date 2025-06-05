// "use client";

// import {
//   createComment,
//   getComments,
//   deleteComment,
//   updateComment,
// } from "@/shared/api/comments/comments-api";
// import { useCallback, useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import ModalBasket from "../modal/ModalBasket";
// import { useRouter } from "next/navigation";
// import { useUserStore } from "@/shared/user/store/UseUserStore";

// interface Comment {
//   id: string;
//   text: string;
//   user: { id: string; firstName: string };
//   book: { id: string };
// }

// interface CreateCommentFormProps {
//   bookId: string;
//   onSuccess?: () => void;
// }

// export const CreateCommentForm = ({
//   bookId,
//   onSuccess,
// }: CreateCommentFormProps) => {
//   const router = useRouter();
//   const { user } = useUserStore();

//   const [text, setText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loadingComments, setLoadingComments] = useState(false);
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [editCommentId, setEditCommentId] = useState<string | null>(null);
//   const [editText, setEditText] = useState("");

//   const fetchComments = useCallback(async () => {
//     setLoadingComments(true);
//     try {
//       const data = await getComments({ book_id: bookId });
//       setComments(data.entities || []);
//     } catch (err) {
//       toast.error("Не вдалося завантажити коментарі");
//       console.error(err);
//     } finally {
//       setLoadingComments(false);
//     }
//   }, [bookId]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!text.trim()) {
//       toast.error("Коментар не може бути порожнім");
//       return;
//     }

//     if (!user) {
//       setIsModalOpen(true);
//     } else {
//       try {
//         setLoading(true);
//         await createComment(bookId, text.trim());
//         setText("");
//         await fetchComments();
//         toast.success("Коментар успішно додано!");

//         if (onSuccess) onSuccess();
//       } catch (err: unknown) {
//         console.error("❌ Помилка при створенні коментаря:", err);
//         toast.error("Не вдалося створити коментар. Спробуйте ще раз.");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleDelete = async (commentId: string) => {
//     try {
//       await deleteComment(commentId);

//       setComments((prev) => prev.filter((c) => c.id !== commentId));
//       toast.success("Коментар видалено");
//     } catch {
//       toast.error("Помилка при видаленні коментаря");
//     }
//   };

//   const canDelete = (commentUserId: string) => {
//     return user?.id === commentUserId || user?.role === "Admin";
//   };

//   const handleEdit = async (commentId: string) => {
//     try {
//       await updateComment(commentId, editText.trim());
//       toast.success("Коментар оновлено");
//       setEditCommentId(null);
//       fetchComments();
//     } catch {
//       toast.error("Не вдалося оновити коментар");
//     }
//   };

//   console.log("comments", comments);

//   useEffect(() => {
//     fetchComments();
//   }, [fetchComments]);

//   return (
//     <>
//       <div>
//         <form onSubmit={handleSubmit} className="space-y-3">
//           <textarea
//             value={text}
//             onChange={(e) => setText(e.target.value)}
//             placeholder="Напишіть ваш коментар..."
//             rows={4}
//             className="w-full p-2 border rounded-lg resize-none"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//           >
//             {loading ? "Надсилання..." : "Надіслати коментар"}
//           </button>
//         </form>

//         <ModalBasket
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onConfirm={() => router.push("/auth/sign-in")}
//         />
//       </div>

//       <div className="space-y-4">
//         <h3 className="text-lg font-semibold">Коментарі:</h3>
//         {loadingComments ? (
//           <p>Завантаження...</p>
//         ) : comments.length === 0 ? (
//           <p>Коментарів ще немає.</p>
//         ) : (
//           comments.map((comment) => {
//             const isAuthor = user?.id === comment.user.id;
//             const canEdit = isAuthor;

//             return (
//               <div key={comment.id} className="border p-3 rounded mb-2">
//                 {editCommentId === comment.id ? (
//                   <>
//                     <textarea
//                       value={editText}
//                       onChange={(e) => setEditText(e.target.value)}
//                       className="w-full p-2 border rounded mb-2"
//                     />
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => handleEdit(comment.id)}
//                         className="px-3 py-1 bg-green-600 text-white rounded"
//                       >
//                         Зберегти
//                       </button>
//                       <button
//                         onClick={() => setEditCommentId(null)}
//                         className="px-3 py-1 bg-gray-300 rounded"
//                       >
//                         Скасувати
//                       </button>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <p className="mb-1">{comment.text}</p>
//                     {canEdit && (
//                       <div className="flex gap-2">
//                         <button
//                           onClick={() => {
//                             setEditCommentId(comment.id);
//                             setEditText(comment.text);
//                           }}
//                           className="text-blue-600 hover:underline"
//                         >
//                           Редагувати
//                         </button>
//                         <button
//                           onClick={() => handleDelete(comment.id)}
//                           className="text-red-600 hover:underline"
//                         >
//                           Видалити
//                         </button>
//                       </div>
//                     )}
//                   </>
//                 )}
//               </div>
//             );
//           })
//         )}
//       </div>
//     </>
//   );
// };

// components/comments/CommentsSection.tsx
import { getComments } from "@/shared/api/comments/comments-api";
import ClientCommentsSection from "./ClientCommentsSection";

interface CommentsServerProps {
  bookId: string;
}

const CommentsServer = async ({ bookId }: CommentsServerProps) => {
  const data = await getComments({ book_id: bookId });
  const comments = data.entities || [];

  return <ClientCommentsSection comments={comments} bookId={bookId} />;
};

export default CommentsServer;
