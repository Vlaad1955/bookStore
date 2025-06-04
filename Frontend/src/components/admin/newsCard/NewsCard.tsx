"use client";

import React, { useState } from "react";
import styles from "@/components/admin/userCard/styles.module.css";
import { Button } from "@/components/ui/button/Button";
import { News } from "@/shared/types/newsATypes/news";
import { removeNews } from "@/shared/admin/news/news-api";
import Link from "next/link";
import Modal from "@/components/ui/modalAdmin/ConfirmModal";

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
                    <Button variant="edit">Редагувати</Button>
                </div>
            </Link>
            <div className={styles.cardButtonWrapper}>
                <Button variant="delete" onClick={handleDelete} disabled={isDeleting}>
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
