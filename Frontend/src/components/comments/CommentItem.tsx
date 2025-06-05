"use client";

import { useUserStore } from "@/shared/user/store/UseUserStore";
import {
  deleteComment,
  updateComment,
} from "@/shared/api/comments/comments-api";
import { useState } from "react";
import { toast } from "react-toastify";
import { Comment } from "@/shared/types/commentTypes/commet";
import styles from "./styles.module.scss";
import { Button } from "../ui/button/Button";
import { ButtonVariant } from "@/shared/enums/button/button-variant.enum";

interface Props {
  comment: Comment;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}

const CommentItem = ({ comment, onDelete, onUpdate }: Props) => {
  const { user } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);

  const isAuthor = user?.id === comment.user.id;
  const isAdmin = user?.role === "Admin";
  const canManage = isAuthor || isAdmin;

  const handleDelete = async () => {
    try {
      await deleteComment(comment.id);
      onDelete(comment.id);
      toast.success("Коментар видалено");
    } catch {
      toast.error("Помилка при видаленні коментаря");
    }
  };

  const handleUpdate = async () => {
    try {
      await updateComment(comment.id, editText.trim());
      onUpdate(comment.id, editText.trim());
      toast.success("Коментар оновлено");
      setIsEditing(false);
    } catch {
      toast.error("Не вдалося оновити коментар");
    }
  };

  return (
    <div className={styles.comment_item_container}>
      {isEditing ? (
        <>
          <div className={styles.comment_item_description}>
            <div className={styles.comment_item_name}>
              {comment.user.firstName}
            </div>

            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className={styles.comment_item_textarea}
            />
          </div>
          <div className={styles.comment_item_}>
            <Button
              variant={ButtonVariant.DELETE}
              onClick={handleUpdate}
              className={styles.comment_item_save}
            >
              Зберегти
            </Button>
            <Button
              variant={ButtonVariant.DELETE}
              onClick={() => setIsEditing(false)}
              className={styles.comment_item_cancel}
            >
              Скасувати
            </Button>
          </div>
        </>
      ) : (
        <>
          <div className={styles.comment_item_description}>
            <div className={styles.comment_item_name}>
              {comment.user.firstName}
            </div>

            <div className={styles.comment_item_text}>{comment.text}</div>
          </div>
          {canManage && (
            <div className={styles.comment_item_container_manage}>
              {isAuthor && (
                <Button
                  onClick={() => setIsEditing(true)}
                  className={styles.comment_item_manage}
                >
                  Редагувати
                </Button>
              )}
              <Button
                variant={ButtonVariant.DELETE}
                onClick={handleDelete}
                className={styles.comment_item_delete}
              >
                Видалити
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CommentItem;
