"use client";

import React, {useState} from "react";
import styles from "@/admin/books/components/card/styles.module.scss";
import {Button} from "@/components/ui/button/Button";
import Link from "next/link";
import {Book} from "@/features/books/types/book";
import {removeBook, updatePublishedStatus,} from "@/admin/books/api/books";
import ConfirmModal from "@/components/ui/modal/modal-admin/ConfirmModal";
import {ButtonVariant} from "@/components/ui/button/button-type/button-variant.enum";
import Image from "next/image";
import {toast} from "react-toastify";

const BookCard = ({book}: { book: Book }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState<"published" | "delete" | null>(
        null
    );

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
                await updatePublishedStatus(String(book.id), {published: true});
                setIsVisible(false);
                toast.success("Книга опублікована.");
            } catch (error) {
                toast.error("Книгу не опубліковано!");
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
                toast.success("Книга видалена.");
                setIsVisible(false);
            } catch (error) {
                console.error("Помилка при видаленні книги:", error);
                toast.error("Не вдалося видалити книгу.");
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
                        <Image
                            src={book.image || "/no-image.png"}
                            alt={book.title}
                            width={300}
                            height={300}
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
                        <Button variant={ButtonVariant.SECONDARY}>Редагувати</Button>
                    </Link>

                    <Button variant={ButtonVariant.DELETE} onClick={handleDelete} disabled={isDeleting}>
                        {isDeleting ? "Видалення..." : "Видалити"}
                    </Button>

                    {!book.published && (
                        <Button variant={ButtonVariant.SECONDARY} onClick={handlePublish}>
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
