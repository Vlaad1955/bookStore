"use client";

import React, { useState } from "react";
import styles from "@/components/admin/booksCard/BookCard.module.css";
import { Button } from "@/components/ui/button/Button";
import Link from "next/link";
import { Book } from "@/shared/types/bookTypes/bookTypes";
import { removeBook } from "@/shared/admin/books/books-api";
import ConfirmModal from "@/components/ui/modalAdmin/ConfirmModal"; // Імпортуй свою модалку

const BookCard = ({ book }: { book: Book }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // Додали стан для модалки

    const handleDelete = async () => {
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
                        onClick={() => setIsModalOpen(true)}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Видалення..." : "Видалити"}
                    </Button>
                </div>
            </div>

            <ConfirmModal
                isOpen={isModalOpen}
                message="delete"
                onConfirm={handleDelete}
                onCancel={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default BookCard;
