import {Comment} from "@/features/comments/types/comments";
import {groupCommentsByBook} from "@/features/comments/hooks/groupCommentsByBook"
import ClientCommentsSection from "@/features/comments/components/ClientCommentsSection";
import BookSmallCard from "@/features/books/components/BookSmallCard";

const MyCommentsList = ({comments}: { comments: Comment[] }) => {

    const groupedByBook = groupCommentsByBook(comments);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Коментарі користувача</h1>
            {Object.entries(groupedByBook).map(([bookId, {book, comments}]) => (
                <div key={bookId} className="mb-8">
                    <BookSmallCard book={book}/>
                    <ClientCommentsSection comments={comments} bookId={`${book.id}`}/>
                </div>
            ))}
        </div>
    );

}
export default MyCommentsList;