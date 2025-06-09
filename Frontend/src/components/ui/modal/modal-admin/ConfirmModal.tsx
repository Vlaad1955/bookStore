"use client";

import React from "react";
import styles from "./styles.module.scss";
import { Button } from "@/components/ui/button/Button";

type MessageType = "delete" | "save" | "create" | "admin" | "category" | string;

interface ConfirmModalProps {
  isOpen: boolean;
  message: MessageType;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  customMessage?: string;
}

const getDefaultMessage = (type: MessageType): string => {
  switch (type) {
    case "delete":
      return "Ви впевнені, що хочете видалити це?";
    case "save":
      return "Ви впевнені, що хочете зберегти зміни?";
    case "create":
      return "Ви впевнені, що хочете створити цю книгу?";
    case "category":
      return "Ви впевнені що хочете додати цю підкатегорію?";
    case "published":
      return "Опублікувати цю книгу?";
    case "admin":
      return "Ви впевнені, що хочете надати права адміністратора цьому користувачу?";
    default:
      return typeof type === "string" ? type : "Ви впевнені?";
  }
};

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
  title = "Підтвердження дії",
  customMessage,
}) => {
  if (!isOpen) return null;

  const finalMessage = customMessage || getDefaultMessage(message);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.text}>{finalMessage}</p>
        <div className={styles.buttons}>
          <Button onClick={onCancel} className={styles.cancel}>
            Скасувати
          </Button>
          <Button onClick={onConfirm} className={styles.confirm}>
            Підтвердити
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
