import {Book} from "@/features/books/types/book";
import {Comment} from "@/features/comments/types/comments";

export function groupCommentsByBook(entities: Comment[]) {
    const result: Record<
        string,
        {
            book: Book;
            comments: any[];
        }
    > = {};

    for (const comment of entities) {
        const bookId = comment.book.id;
        if (!result[bookId]) {
            result[bookId] = {
                book: comment.book,
                comments: [],
            };
        }
        result[bookId].comments.push(comment);
    }

    return result;
}