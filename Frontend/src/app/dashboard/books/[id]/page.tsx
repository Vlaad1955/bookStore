import CommentsServer from "@/features/comments/components/CommentsServer";
import BookItem from "@/features/books/components/BookItem";
import { getOneBook } from "@/features/books/api/books";

export default async function BookFindOne({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getOneBook(id);
  return (
    <>
      <BookItem book={book} />
      <CommentsServer bookId={id} />
    </>
  );
}
