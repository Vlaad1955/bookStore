"use client";

import React, {useState} from "react";
import styles from "./styles.module.scss";
import {Button} from "@/components/ui/button/Button";
import {User} from "@/admin/users/types/user";
import {deleteUserByAdmin, updateUserRole} from "@/admin/users/api/users";
import {ButtonVariant} from "@/components/ui/button/button-type/button-variant.enum";
import Image from "next/image";
import Modal from "@/components/ui/modal/modal-admin/ConfirmModal";
import {toast} from "react-toastify";

const UserCard = ({user}: { user: User }) => {
    const [role, setRole] = useState(user.role);
    const [loading, setLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePromote = async () => {
        try {
            setLoading(true);
            const updatedUser = await updateUserRole(user.id);
            toast.success("Роль користувача оновлено.");
            setRole(updatedUser.role);
        } catch (error) {
            console.error("Не вдалося оновити роль користувача:", error);
            toast.error("Помилка при оновленні ролі користувача");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        setIsModalOpen(true);
    };


    const handleConfirmDelete = async () => {
        try {
            setLoading(true);
            await deleteUserByAdmin(user.id);
            toast.success("Користувача видалено.");
            setIsDeleted(true);
        } catch (error) {
            console.error("Не вдалося видалити користувача:", error);
            toast.error("Помилка при видаленні користувача");
        } finally {
            setLoading(false);
            setIsModalOpen(false);
        }
    };

    if (isDeleted) return null;

    return (
        <div className={styles.movieCard}>
            <div className={styles.cardImage}>
                <Image src={user.image} alt={user.firstName || "User avatar"} width={300}
                       height={300}/>
            </div>
            <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>
                    {user.firstName} {user.lastName}
                </h2>
                <p className={styles.cardEmail}>{user.email}</p>
                <div className={styles.cardDetails}>
                    <div>👤 {role}</div>
                    <div>📞 {user.phone}</div>
                </div>
            </div>
            {role === "User" && (
                <>
                    <div className={styles.cardButtonWrapper}>
                        <Button variant={ButtonVariant.SECONDARY} onClick={handlePromote} disabled={loading}>
                            {loading ? "Оновлення..." : "Зробити адміністратором"}
                        </Button>
                    </div>
                    <div className={styles.cardButtonWrapper}>
                        <Button variant={ButtonVariant.DELETE} onClick={handleDelete} disabled={loading}>
                            {loading ? "Оновлення..." : "Видалити користувача"}
                        </Button>
                    </div>

                    <Modal
                        message="delete"
                        isOpen={isModalOpen}
                        onCancel={() => setIsModalOpen(false)}
                        onConfirm={handleConfirmDelete}
                    />
                </>
            )
            }
        </div>
    );
};

export default UserCard;
