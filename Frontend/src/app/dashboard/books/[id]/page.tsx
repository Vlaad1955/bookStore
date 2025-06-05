import BookItem from "@/components/books/BookItem";
import CommentsServer from "@/components/comments/CommentsServer";
import { getOneBook } from "@/shared/api/books/books-api";

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
