import React from 'react';
import {Metadata} from "next";
import AsideComponent from "@/components/admin/aside/AsideComponent";
import styles from "@/components/admin/aside/styles.module.css";

export const metadata: Metadata = {
    title: "Movie page",
    description: "Page about the movie",
}
type Props = { children: React.ReactNode }
const AdminLayout = ({children}: Props) => {
    return (
        <div className={styles.adminLayout}>
            <AsideComponent />
            <main className={styles.mainContent}>
                {children}
            </main>
        </div>
    );
};

export default AdminLayout;