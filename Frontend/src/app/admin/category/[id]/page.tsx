
import CategoryList from "@/components/admin/categoryList/CategoryList";
import Pagination from "@/components/admin/pagination/Pagination";
import {getCategoryList, getMainCategories} from "@/shared/api/category/category-api";


type Params = { id: string };

export default async function CategoryPage ({
                                                params,
                                            }: {
    params: Params;
}) {
    const {id} = await params;
    const page = parseInt(id, 10) || 1;

    const data = await getCategoryList({
        page,
    });

    const mainCategories = await getMainCategories();
    return(
        <div>
        <CategoryList category={data.entities} main={mainCategories}/>
    <Pagination currentPage={data.page} totalPages={data.pages} />
        </div>
    );
}