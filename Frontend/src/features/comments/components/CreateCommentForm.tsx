"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createComment } from "@/features/comments/api/commentsApi";
import ModalBasket from "../modal/ModalBasket";
import { useUserStore } from "@/shared/user/store/UseUserStore";
import { toast } from "react-toastify";
import { Comment } from "@/features/comments/types/comments";
import styles from "./styles.module.scss";
import Form from "next/form";
import { Button } from "../ui/button/Button";
import { ButtonType } from "@/components/ui/button/button-type/button-type.enum";

interface Props {
  bookId: string;
  onSuccess: (comment: Comment) => void;
}

const CreateCommentForm = ({ bookId, onSuccess }: Props) => {
  const router = useRouter();
  const { user } = useUserStore();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.error("Коментар не може бути порожнім");
      return;
    }

    if (!user) {
      setIsModalOpen(true);
      return;
    }

    try {
      setLoading(true);
      const comment = await createComment(bookId, text.trim());
      onSuccess(comment);
      setText("");
      toast.success("Коментар успішно додано!");
    } catch {
      toast.error("Не вдалося створити коментар");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className={styles.form_submit_container}
        action={""}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Напишіть ваш відгук..."
          rows={4}
          className={styles.form_submit_textarea}
        />
        <Button
          type={ButtonType.SUBMIT}
          disabled={loading}
          className={styles.form_submit_button}
        >
          {loading ? "Надсилання..." : "Надіслати відгук"}
        </Button>
      </Form>

      <ModalBasket
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => router.push("/auth/sign-in")}
      />
    </>
  );
};

export default CreateCommentForm;
