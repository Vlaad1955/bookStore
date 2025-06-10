import EditNewsForm from "@/admin/news/components/edit-form/EditNewsForm";
import { getOneNews } from "@/admin/news/api/news";

type Params = { id: string };

export default async function EditNewsPage({ params }: { params: Params }) {
    const {id} = params;
    const news = await getOneNews(id);

    return (
        <div>
            <EditNewsForm news={news} />
        </div>
    );
}