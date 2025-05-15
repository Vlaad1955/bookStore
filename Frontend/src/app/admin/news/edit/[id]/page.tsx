import EditNewsForm from "@/components/admin/newsForm/EditNewsForm";
import { getOneNews } from "@/shared/admin/news/news-api";

type Params = { id: string };

export default async function EditNewsPage({ params }: { params: Params }) {
    const {id} = await params;
    const news = await getOneNews(id);

    return (
        <div>
            <EditNewsForm news={news} />
        </div>
    );
}