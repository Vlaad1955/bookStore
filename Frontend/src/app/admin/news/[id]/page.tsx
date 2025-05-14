import Pagination from "@/components/admin/pagination/Pagination";
import NewsList from "@/components/admin/newsList/NewsList";

type Params = { id: string };

export default async function NewsPage({ params }: { params: Params }) {
    const page = parseInt(params.id, 10) || 1;

    const res = await fetch(`http://localhost:4000/news/list?page=${page}`, {
        cache: "no-store", // щоб не кешував
    });

    const data = await res.json();

    return (
        <div>
            <NewsList news={data.entities} />
            <Pagination currentPage={data.page} totalPages={data.pages} />
        </div>
    );
}