// components/ui/Modal.tsx
import React from "react";
import styles from "./styles.module.scss";
import { Button } from "../../button/Button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p className={styles.text}>
          Щоб придбати книжку, потрібно бути авторизованим.
        </p>
        <div className={styles.buttons}>
          <Button onClick={onConfirm} className={styles.confirm}>
            Перейти до входу
          </Button>
          <Button onClick={onClose} className={styles.cancel}>
            Залишитися
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
