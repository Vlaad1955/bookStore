import BooksHeader from "@/components/admin/BooksHeader/BooksHeader";
import BooksList from "@/components/admin/booksList/BooksList";
import Pagination from "@/components/admin/pagination/Pagination";
import { getAllBooks } from "@/shared/admin/books/books-api";
import { objectToCleanURLSearchParams } from "@/features/books/hooks/objectToCleanURLSearchParams";

type Params = { id: string };
type SearchParams = { title?: string; published?: string };

export default async function BooksPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const newParams = objectToCleanURLSearchParams(searchParams, [
    "limit",
    "sort",
    "order",
  ]);
  const { id } = await params;
  const { title, published } = await searchParams;
  const page = parseInt(id, 10) || 1;

  const data = await getAllBooks({
    page,
    title: title || undefined,
    published:
      published === "true" ? true : published === "false" ? false : undefined,
  });

  return (
    <div>
      <BooksHeader />
      <BooksList books={data.entities} />
      <Pagination
        currentPage={data.page}
        totalPages={data.pages}
        searchName={`books`}
        params={newParams}
      />
    </div>
  );
}
