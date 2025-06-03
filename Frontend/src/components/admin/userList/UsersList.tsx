import React from "react";
import UserCard from "@/components/admin/userCard/UserCard";
import styles from "@/components/admin/userList/styles.module.css";
import {User} from "@/shared/types/userATypes/user";

const UsersList  = ({ users }: { users: User[] }) =>{



    return(
        <div className={styles.menu}>
            <ul key={`users`} className={styles.list}>
                {users.map((user) =>(
                <li key={user.id}>
                    <div className={styles.listItem}>
                    <UserCard user={user} key={user.id}/>
                    </div>
                </li>
                    ))}
            </ul>
        </div>
    )
};

export default UsersList;