"use client";

import React, { useState } from "react";
import styles from "@/components/admin/booksCard/BookCard.module.css";
import { Button } from "@/components/ui/button/Button";
import Link from "next/link";
import { Book } from "@/shared/types/bookTypes/bookTypes";
import {
    removeBook,
    updatePublishedStatus,
} from "@/shared/admin/books/books-api";
import ConfirmModal from "@/components/ui/modalAdmin/ConfirmModal";

const BookCard = ({ book }: { book: Book }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"published" | "delete" | null>(null);

    const handlePublish = () => {
        setModalType("published");
        setIsModalOpen(true);
    };

    const handleDelete = () => {
        setModalType("delete");
        setIsModalOpen(true);
    };

    const handleConfirm = async () => {
        if (modalType === "published") {
            try {
                await updatePublishedStatus(book.id, { published: true });
                setIsVisible(false);
            } catch (error) {
                console.error("Помилка публікації:", error);
            } finally {
                setIsModalOpen(false);
                setModalType(null);
            }
        }

        if (modalType === "delete") {
            try {
                setIsDeleting(true);
                await removeBook(book.id.toString());
                setIsVisible(false);
            } catch (error) {
                console.error("Помилка при видаленні книги:", error);
                alert("Не вдалося видалити книгу.");
            } finally {
                setIsDeleting(false);
                setIsModalOpen(false);
                setModalType(null);
            }
        }
    };

    if (!isVisible) return null;

    return (
        <>
            <div className={styles.bookCard}>
                <div className={styles.topSection}>
                    <div className={styles.imageWrapper}>
                        <img
                            src={book.image || "/no-image.png"}
                            alt={book.title}
                            className={styles.bookImage}
                        />
                        <div className={styles.imageText}>
                            <h2>{book.title}</h2>
                            {book.author && <p>Автор: {book.author}</p>}
                            <div className={styles.details}>
                                <span>💰 {book.price} грн</span>
                                <span>📘 {book.cover === "soft" ? "М’яка" : "Тверда"}</span>
                                <span>🎁 {book.gift ? "Так" : "Ні"}</span>
                                <span>📰 {book.published ? "Так" : "Ні"}</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.infoSection}>
                        {book.description && (
                            <p className={styles.description}>{book.description}</p>
                        )}
                    </div>
                </div>

                <div className={styles.buttonSection}>
                    <Link href={`/admin/books/edit/${book.id}`}>
                        <Button variant="edit">Редагувати</Button>
                    </Link>

                    <Button
                        variant="delete"
                        onClick={handleDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Видалення..." : "Видалити"}
                    </Button>

                    {!book.published && (
                        <Button variant="edit" onClick={handlePublish}>
                            Опублікувати
                        </Button>
                    )}
                </div>
            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                message={modalType ?? ""}
                onConfirm={handleConfirm}
                onCancel={() => {
                    setIsModalOpen(false);
                    setModalType(null);
                }}
            />
        </>
    );
};

export default BookCard;
