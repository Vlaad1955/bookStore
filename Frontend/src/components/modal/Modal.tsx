"use client";

import styles from "./Modal.module.css";
import { ModalProps } from "@/shared/types/types";

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <button className={styles.closeButton} onClick={onClose}>
          Закрити
        </button>
      </div>
    </div>
  );
};

export default Modal;
