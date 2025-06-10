"use client";

import React, { useState } from "react";
import styles from "@/admin/users/components/card/styles.module.scss";
import { Button } from "@/components/ui/button/Button";
import { News } from "@/features/news/types/news";
import { removeNews } from "@/admin/news/api/news";
import Link from "next/link";
import Modal from "@/components/ui/modal/modal-admin/ConfirmModal";
import {ButtonVariant} from "@/components/ui/button/button-type/button-variant.enum";

const NewsCard = ({ news }: { news: News }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleConfirmDelete = async () => {
    try {
      setIsDeleting(true);
      await removeNews(news.id);
      setIsVisible(false);
    } catch (error) {
      console.error("Помилка при видаленні новини:", error);
      alert("Не вдалося видалити новину.");
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

  const handleDelete = () => {
    setIsModalOpen(true);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.movieCard}>
      <div className={styles.cardImage}>
        <img src={news.image} alt={news.title} />
      </div>
      <div className={styles.cardContent}>
        <h2 className={styles.cardTitle}>{news.title}</h2>
        <p className={styles.cardEmail}>{news.content}</p>
        <div className={styles.cardDetails}>
          <div>🏷️ {news.category}</div>
        </div>
      </div>
      <Link href={`/admin/news/edit/${news.id}`}>
        <div className={styles.cardButtonWrapper}>
          <Button variant={ButtonVariant.SECONDARY}>Редагувати</Button>
        </div>
      </Link>
      <div className={styles.cardButtonWrapper}>
        <Button variant= {ButtonVariant.DELETE} onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? "Видалення..." : "Видалити"}
        </Button>
      </div>

      <Modal
        message="delete"
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default NewsCard;
