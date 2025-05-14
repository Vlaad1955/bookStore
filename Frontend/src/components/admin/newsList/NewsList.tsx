import React from "react";
import styles from "@/components/admin/userList/styles.module.css";
import NewsCard from "@/components/admin/newsCard/NewsCard";
import {News} from "@/shared/types/newsATypes/news";

const NewsList  = ({ news }:{news: News[]}) =>{

    return(
        <div className={styles.menu}>
            <ul key={`news`}>
                {news.map((item) => (
                    <li key={item.id}>
                        <div className="movie-list">
                            <NewsCard news={item} key={item.id}/>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
};

export default NewsList;