"use client";

import { useState } from "react";
import CommentItem from "./CommentItem";
import CreateCommentForm from "./CreateCommentForm";
import { Comment } from "@/features/comments/types/comments";
import styles from "./styles.module.scss";

type ClientCommentProps = {
  comments: Comment[];
  bookId: string;
};

const ClientCommentsSection = ({
  comments: initialComments,
  bookId,
}: ClientCommentProps) => {
  const [comments, setComments] = useState(initialComments);

  const handleAdd = (comment: Comment) =>
    setComments((prev) => [comment, ...prev]);

  const handleDelete = (id: string) =>
    setComments((prev) => prev.filter((c) => c.id !== id));

  const handleUpdate = (id: string, text: string) =>
    setComments((prev) => prev.map((c) => (c.id === id ? { ...c, text } : c)));

  return (
    <div className={styles.comment_section_container}>
      <div className={styles.comment_section_title}>
        Відгуки {comments.length > 0 ? comments.length : "відсутні"}
      </div>
      <CreateCommentForm bookId={bookId} onSuccess={handleAdd} />

      {comments.length === 0 ? (
        <></>
      ) : (
        comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))
      )}
    </div>
  );
};

export default ClientCommentsSection;
