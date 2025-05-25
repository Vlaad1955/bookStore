import { makeCategoryListRequest} from '@/shared/api/category/category-api'
import CreateBookForm from "@/components/admin/bookCreateForm/BookCreateForm";

export default async function CreateBooksPage() {

    const categories = await makeCategoryListRequest("limit=1000");

    return (
        <div>
            <CreateBookForm categories={categories.entities} />
        </div>
    );
}