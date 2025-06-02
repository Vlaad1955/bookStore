import React from 'react';
import UsersList from "@/components/admin/userList/UsersList";
import Pagination from "@/components/admin/pagination/Pagination";
import {getAllUsers} from "@/shared/admin/users/users-api";

type Params = { id: string };

export default async function UsersPage({ params }: { params: Params }) {

    const {id} = await params;
    const page = parseInt(id, 10) || 1;

    const data = await getAllUsers({page});


    return (
        <div>
            <UsersList users={data.entities}/>
            <Pagination currentPage={data.page} totalPages={data.pages} searchName={`users`} />
        </div>
    );
}