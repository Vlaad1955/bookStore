"use client";
import Form from "next/form";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";

import ModalBasket from "@/components/ui/modal/modal-basket/ModalBasket";
import { Button } from "@/components/ui/button/Button";
import { createComment } from "@/features/comments/api/comments";
import { useUserStore } from "@/user/user/store/UseUserStore";
import { Comment } from "@/features/comments/types/comments";
import { ButtonType } from "@/components/ui/button/button-type/button-type.enum";
import styles from "./styles.module.scss";

type CreateCommentProps = {
  bookId: string;
  onSuccess: (comment: Comment) => void;
};

const CreateCommentForm = ({ bookId, onSuccess }: CreateCommentProps) => {
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
