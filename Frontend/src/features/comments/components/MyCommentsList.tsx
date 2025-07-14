"use client";
import ClientCommentsSection from "@/features/comments/components/ClientCommentsSection";
import BookSmallCard from "@/features/books/components/BookSmallCard";
import { Comment } from "@/features/comments/types/comments";
import { groupCommentsByBook } from "@/features/comments/hooks/groupCommentsByBook";
import { useState } from "react";
import styles from "@/features/comments/components/styles.module.scss";

const MyCommentsList = ({ comments }: { comments: Comment[] }) => {
    const grouped = groupCommentsByBook(comments);
    const initial = Object.entries(grouped).map(([bookId, value]) => ({
        bookId,
        book: value.book,
        comments: value.comments,
    }));

    const [items, setItems] = useState(initial);

    const handleDelete = (bookId: string, commentId: string) => {
        setItems((prev) => {
            return prev
                .map((item) =>
                    item.bookId === bookId
                        ? {
                            ...item,
                            comments: item.comments.filter((c) => c.id !== commentId),
                        }
                        : item
                )
                .filter((item) => item.comments.length > 0); // Remove book if no comments left
        });
    };

    const handleUpdate = (bookId: string, commentId: string, text: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.bookId === bookId
                    ? {
                        ...item,
                        comments: item.comments.map((c) =>
                            c.id === commentId ? { ...c, text } : c
                        ),
                    }
                    : item
            )
        );
    };

    const handleAdd = (bookId: string, comment: Comment) => {
        setItems((prev) =>
            prev.map((item) =>
                item.bookId === bookId
                    ? { ...item, comments: [comment, ...item.comments] }
                    : item
            )
        );
    };

    return (
        <article>
            <div className={styles.comments_title}>
                <span>Коментарі користувача</span>
            </div>
            {items.map(({ bookId, book, comments }) => (
                <div key={bookId} className={styles.book_item_wrapper}>
                    <BookSmallCard book={book} />
                    <ClientCommentsSection
                        comments={comments}
                        bookId={bookId}
                        onDelete={(commentId) => handleDelete(bookId, commentId)}
                        onUpdate={(commentId, text) =>
                            handleUpdate(bookId, commentId, text)
                        }
                        onAdd={(comment) => handleAdd(bookId, comment)}
                    />
                </div>
            ))}
        </article>
    );
};

export default MyCommentsList;
