"use client";

import React, {useState} from "react";
import styles from "./styles.module.scss";
import {Button} from "@/components/ui/button/Button";
import {User} from "@/admin/users/types/user";
import {updateUserRole} from "@/admin/users/api/users";
import {ButtonVariant} from "@/components/ui/button/button-type/button-variant.enum";
import Image from "next/image";

const UserCard = ({user}: { user: User }) => {
    const [role, setRole] = useState(user.role); // локальний стан ролі
    const [loading, setLoading] = useState(false); // стан завантаження

    const handlePromote = async () => {
        try {
            setLoading(true);
            const updatedUser = await updateUserRole(user.id);
            setRole(updatedUser.role); // оновлюємо роль у стані
        } catch (error) {
            console.error("Не вдалося оновити роль користувача:", error);
            alert("Помилка при оновленні ролі користувача");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.movieCard}>
            <div className={styles.cardImage}>
                <Image src={user.image} alt={user.firstName} width={300}
                       height={300}/>
            </div>
            <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>
                    {user.firstName} {user.lastName}
                </h2>
                <p className={styles.cardEmail}>{user.email}</p>
                <div className={styles.cardDetails}>
                    <div>👤 {role}</div>
                    {/* використовуємо стан */}
                    <div>📞 {user.phone}</div>
                </div>
            </div>
            {role === "User" && (
                <div className={styles.cardButtonWrapper}>
                    <Button variant={ButtonVariant.SECONDARY} onClick={handlePromote} disabled={loading}>
                        {loading ? "Оновлення..." : "Зробити адміністратором"}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default UserCard;
