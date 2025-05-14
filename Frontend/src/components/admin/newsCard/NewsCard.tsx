import React from "react";
import styles from "@/components/admin/userCard/styles.module.css";
import { Button } from "@/components/ui/button/Button";
import {News} from "@/shared/types/newsATypes/news";



const UserCard = ({ news }:{news: News}) => {
    return (
        <div className={styles.movieCard}>
            <div className={styles.cardImage}>
                <img src={news.image} alt={news.title} />
            </div>
            <div className={styles.cardContent}>
                <h2 className={styles.cardTitle}>
                    {news.title}
                </h2>
                <p className={styles.cardEmail}>{news.content}</p>
                <div className={styles.cardDetails}>
                    <div>🏷️ {news.category}</div>
                </div>
            </div>
                <div className={styles.cardButtonWrapper}>
                    <Button variant="delete">Видалити</Button>
                </div>
            <div className={styles.cardButtonWrapper}>
                <Button variant="delete">Редагувати</Button>
            </div>
        </div>
    );
};

export default UserCard;