import Pagination from "@/components/admin/pagination/Pagination";
import NewsList from "@/components/admin/newsList/NewsList";
import NewsHeader from "@/components/admin/newsHeader/NewsHeader";
import { getAllNews } from "@/shared/admin/news/news-api";
import { objectToCleanURLSearchParams } from "@/features/books/hooks/objectToCleanURLSearchParams";

type Params = { id: string };
type SearchParams = { title?: string; category?: string };

export default async function NewsPage({
  params,
  searchParams,
}: {
  params: Params;
  searchParams: SearchParams;
}) {
  const newParams = objectToCleanURLSearchParams(searchParams);
  const { id } = await params;
  const { title, category } = await searchParams;
  const page = parseInt(id, 10) || 1;

  const data = await getAllNews({
    page,
    title: title,
    category: category,
  });

  return (
    <div>
      <NewsHeader />
      <NewsList news={data.entities} />
      <Pagination
        currentPage={data.page}
        totalPages={data.pages}
        searchName={`news`}
        params={newParams}
      />
    </div>
  );
}
