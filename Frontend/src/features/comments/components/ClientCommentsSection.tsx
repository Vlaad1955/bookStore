"use client";
import { useState, useEffect } from "react";
import CommentItem from "./CommentItem";
import CreateCommentForm from "./CreateCommentForm";
import { Comment } from "@/features/comments/types/comments";
import styles from "./styles.module.scss";

type ClientCommentProps = {
  comments: Comment[];
  bookId: string;
  onDelete?: (id: string) => void;
  onUpdate?: (id: string, text: string) => void;
  onAdd?: (comment: Comment) => void;
};

const ClientCommentsSection = ({
  comments: initialComments,
  bookId,
  onDelete,
  onUpdate,
  onAdd,
}: ClientCommentProps) => {
  const [internalComments, setInternalComments] = useState(initialComments);

  const isControlled = onDelete || onUpdate || onAdd;

  useEffect(() => {
    setInternalComments(initialComments);
  }, [initialComments]);

  const handleAdd = (comment: Comment) => {
    if (onAdd) return onAdd(comment);
    setInternalComments((prev) => [comment, ...prev]);
  };

  const handleDelete = (id: string) => {
    if (onDelete) return onDelete(id);
    setInternalComments((prev) => prev.filter((c) => c.id !== id));
  };

  const handleUpdate = (id: string, text: string) => {
    if (onUpdate) return onUpdate(id, text);
    setInternalComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, text } : c))
    );
  };

  const comments = isControlled ? initialComments : internalComments;

  return (
    <section className={styles.comment_section_container}>
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
            onDelete={() => handleDelete(comment.id)}
            onUpdate={(id, text) => handleUpdate(id, text)}
          />
        ))
      )}
    </section>
  );
};

export default ClientCommentsSection;
