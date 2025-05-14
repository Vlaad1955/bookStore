import Pagination from "@/components/admin/pagination/Pagination";
import NewsList from "@/components/admin/newsList/NewsList";
import {getAllNews} from "@/shared/api/news/news-api";

type Params = { id: string };

export default async function NewsPage({ params }: { params: Params }) {
    const page = parseInt(params.id, 10) || 1;

    const data = await getAllNews({ page });

    return (
        <div>
            <NewsList news={data.entities} />
            <Pagination currentPage={data.page} totalPages={data.pages} />
        </div>
    );
}