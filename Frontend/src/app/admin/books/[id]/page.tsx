import BooksHeader from "@/admin/books/components/header/BooksHeader";
import BooksList from "@/admin/books/components/list/BooksList";
import Pagination from "@/admin/other/components/pagination/Pagination";
import { getAllBooks } from "@/admin/books/api/books";
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
  const { id } = params;
  const { title, published } = searchParams;
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
