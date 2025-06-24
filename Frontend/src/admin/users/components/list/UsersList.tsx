import React from "react";
import UserCard from "@/admin/users/components/card/UserCard";
import styles from "@/admin/users/components/list/styles.module.scss";
import {User} from "@/admin/users/types/user";

const UsersList = ({users}: { users: User[] }) => {
    return (
        <div className={styles.menu}>
            <ul key={`users`} className={styles.list}>
                {users.map((user) => (
                    <li key={user.id}>
                        <div className={styles.listItem}>
                            <UserCard user={user} key={user.id}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
