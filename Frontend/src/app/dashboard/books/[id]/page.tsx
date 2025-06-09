import BookItem from "@/features/books/components/BookItem";
import CommentsServer from "@/components/comments/CommentsServer";
import { getOneBook } from "@/features/books/api/booksApi";

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
  ); // Assuming BookItem takes a book prop
}
