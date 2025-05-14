import React from "react";
import styles from "./styles.module.css";
import { Button } from "@/components/ui/button/Button";
import {User} from "@/shared/types/userATypes/user";


const UserCard = ({ user }: { user: User }) => {
    return (
        <div className={styles.movieCard}>
            <div className={styles.cardImage}>
                <img src={user.image} alt={user.firstName} />
            </div>
            <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>
                    {user.firstName} {user.lastName}
                </h2>
                <p className={styles.cardEmail}>{user.email}</p>
                <div className={styles.cardDetails}>
                    <div>👤 {user.role}</div>
                    <div>📞 {user.phone}</div>
                </div>
            </div>
            {user.role === "User" && (
                <div className={styles.cardButtonWrapper}>
                    <Button variant="delete">Зробити адміном</Button>
                </div>
            )}
        </div>
    );
};

export default UserCard;
