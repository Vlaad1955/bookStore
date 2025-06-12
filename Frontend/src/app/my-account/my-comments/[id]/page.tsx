import {getComments} from "@/features/comments/api/comments";
import MyCommentsList from "@/features/comments/components/MyCommentsList";
import Pagination from "@/admin/other/components/pagination/Pagination";
import ProtectedRoute from "@/shared/protected-route/protectedRoute";


type Params = { id: string };
type SearchParams = { page?: string };

export default async function MyCommentsPage({params, searchParams}: {
    params: Params;
    searchParams: SearchParams;
}) {

    const {id} = await params;
    const {page} = await searchParams;

    const data = await getComments({
        page,
        user_id: id
    })

    return (
            <ProtectedRoute>
            <MyCommentsList comments={data.entities}/>
            <Pagination currentPage={data.page} totalPages={data.pages} userName={id}/>
            </ProtectedRoute>
    );
};
