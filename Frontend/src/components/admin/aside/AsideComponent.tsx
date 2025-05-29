"use client";

import React from "react";
import {Button} from "@/components/ui/button/Button";
import styles from "./styles.module.css";
import {useRouter} from "next/navigation";

const AsideComponent =  () =>{
    const router = useRouter();

    return(
        <aside className={styles.sidebar}>
            <div className={styles.menu}>
                <h4>Адімінстративна панель</h4>
               <Button onClick={() => router.push("/admin/users/1")} >Керування користувачами</Button>
                <Button onClick={() => router.push("/admin/news/1")}>Керування новинами</Button>
                <Button onClick={() => router.push("/admin/category/1")} >Керування категоріями</Button>
                <Button onClick={() => router.push("/admin/books/1")} >Керування товаром</Button>
            </div>
            <button className={styles.sign_out}>Вийти</button>
        </aside>
    );
};

export default AsideComponent;