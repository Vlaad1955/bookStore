import BookItem from "@/features/books/components/BookItem";
import { getOneBook } from "@/features/books/api/books";
import CommentsServer from "@/features/comments/components/CommentsServer";

export default async function BookFindOne({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getOneBook(id);
  console.log(book);
  return (
    <>
      <BookItem book={book} />
      <CommentsServer bookId={book.id.toString()} />
    </>
  );
}
