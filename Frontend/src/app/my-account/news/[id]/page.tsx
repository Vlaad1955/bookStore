import NewsItem from "@/features/news/components/NewsItem";
import { getOneNews } from "@/shared/admin/news/news-api";

export default async function OneNews({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const news = await getOneNews(id);
  console.log(news);
  return <NewsItem news={news} />;
}
