import BookWrapper from "@/features/books/components/BookWrapper";
import { getBooksInOneCategory } from "@/features/books/api/books";
import { Book } from "@/features/books/types/book";
import { cleanParams } from "@/shared/hooks/clean-params/cleanParams.hook";
import { objectToCleanURLSearchParams } from "@/features/books/hooks/objectToCleanURLSearchParams.hook";
import { retryAsync } from "@/shared/hooks/retry/useRetry.hook";
import {
  getBooleanParam,
  getParam,
} from "@/shared/hooks/get-param/getParam.hook";

type BookProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

function buildFilters(searchParams: BookProps["searchParams"]) {
  return {
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 18,
    title: getParam(searchParams.title),
    author: getParam(searchParams.author),
    price: getParam(searchParams.price),
    gift: getParam(searchParams.gift),
    cover: getParam(searchParams.cover),
    sort: getParam(searchParams.sort, "title"),
    order: getParam(searchParams.order, "ASC"),
    categories: getParam(searchParams.categories),
    published: getBooleanParam(searchParams.published, true),
    search: getParam(searchParams.search),
  };
}

async function fetchBooksData(filters: ReturnType<typeof buildFilters>) {
  const baseParams = cleanParams({
    ...filters,
    author: undefined,
    gift: undefined,
    cover: undefined,
    title: undefined,
    page: undefined,
    limit: 10000,
  });

  return retryAsync(
    async () => {
      const data = await getBooksInOneCategory(cleanParams(filters));
      const all = await getBooksInOneCategory(cleanParams(baseParams));
      return { data, all };
    },
    3,
    1000
  );
}

export default async function BookPage({ searchParams }: BookProps) {
  const filters = buildFilters(await searchParams);
  let books: Book[] = [];
  let allCategoryBooks: Book[] = [];
  let currentPage = 1;
  let totalPages = 1;

  try {
    const { data, all } = await fetchBooksData(filters);
    books = data.entities;
    totalPages = data.pages;
    currentPage = data.page;
    allCategoryBooks = all.entities;
  } catch (error) {
    throw error;
  }

  const initialAuthors = Array.from(
    new Set(allCategoryBooks.map((book) => book.author))
  ).sort((a, b) => a.localeCompare(b));

  const urlParams = objectToCleanURLSearchParams(filters);

  return (
    <BookWrapper
      initialAuthor={initialAuthors}
      books={books}
      currentPage={currentPage}
      totalPages={totalPages}
      params={urlParams}
    />
  );
}
