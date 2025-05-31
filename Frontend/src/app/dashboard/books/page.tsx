import { getBooksInOneCategory } from "@/shared/api/books/books-api";
import { cleanParams } from "@/shared/utils/cleanParams";
import { Book } from "@/shared/types/bookTypes/bookTypes";
import BookWrapper from "@/components/books/BookWrapper";
interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

function getParam(value: string | string[] | undefined, defaultValue = "") {
  if (Array.isArray(value)) return value.join(",");
  return value ?? defaultValue;
}

export default async function BookPage({ searchParams }: Props) {
  const filters = {
    page: Number(searchParams.page) || 1,
    limit: Number(searchParams.limit) || 20,
    title: getParam(searchParams.title),
    author: getParam(searchParams.author),
    price: getParam(searchParams.price),
    gift: getParam(searchParams.gift),
    cover: getParam(searchParams.cover),
    sort: getParam(searchParams.sort, "title"),
    order: getParam(searchParams.order, "ASC"),
    categories: getParam(searchParams.categories),
    published: getParam(searchParams.published, "true"), // додано для фільтрації за опублікованими книгами
  };

  const baseParams = cleanParams({
    ...filters,
    author: undefined,
    gift: undefined,
    cover: undefined,
    title: undefined,
    page: undefined,
    limit: undefined,
  });

  let books: Book[] = [];
  let allCategoryBooks: Book[] = [];

  try {
    const data = await getBooksInOneCategory(cleanParams(filters));
    books = data.entities;

    const all = await getBooksInOneCategory(baseParams);
    allCategoryBooks = all.entities;
  } catch (error) {
    console.error("Помилка завантаження книг:", error);
  }

  const authors = Array.from(new Set(books.map((book) => book.author)));
  const initialAuthor = Array.from(
    new Set(allCategoryBooks.map((book) => book.author))
  );
  console.log(initialAuthor);

  console.log("Фільтри:", authors);
  return <BookWrapper initialAuthor={initialAuthor} books={books} />;
}
