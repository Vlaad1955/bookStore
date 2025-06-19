import ClientCommentsSection from "@/features/comments/components/ClientCommentsSection";
import BookSmallCard from "@/features/books/components/BookSmallCard";
import { groupCommentsByBook } from "@/features/comments/hooks/groupCommentsByBook";
import { Comment } from "@/features/comments/types/comments";
import styles from "@/features/comments/components/styles.module.scss";

const MyCommentsList = ({ comments }: { comments: Comment[] }) => {
  const groupedByBook = groupCommentsByBook(comments);

  return (
    <div>
      <div className={styles.comments_title}>
        <span>Коментарі користувача</span>
      </div>
      {Object.entries(groupedByBook).map(([bookId, { book, comments }]) => (
        <div key={bookId} className={styles.book_item_wrapper}>
          <BookSmallCard book={book} />
          <ClientCommentsSection comments={comments} bookId={`${book.id}`} />
        </div>
      ))}
    </div>
  );
};
export default MyCommentsList;
