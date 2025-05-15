import React from 'react';
import UsersList from "@/components/admin/userList/UsersList";
import Pagination from "@/components/admin/pagination/Pagination";

type Params = { id: string };

export default async function UsersPage({ params }: { params: Params }) {
    const page = Number(params.id) || 1;

    const res = await fetch(`http://localhost:4000/users/list?page=${page}`, {
        cache: "no-store",
    });

    const data = await res.json();


    return (
        <div>
            <UsersList users={data.entities}/>
            <Pagination currentPage={data.page} totalPages={data.pages} />
        </div>
    );
}