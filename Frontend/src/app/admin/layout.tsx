import React from "react";
import {Metadata} from "next";
import AsideComponent from "@/admin/other/components/aside/AsideComponent";
import styles from "@/admin/other/components/aside/styles.module.scss";
import {ProtectedRouteRole} from "@/shared/protected-route/protectedRoleRoute";

export const metadata: Metadata = {
    title: "Адміністративна панель",
    description: "Admin control page",
};
type Props = { children: React.ReactNode };
const AdminLayout = ({children}: Props) => {
    return (
        <ProtectedRouteRole allowedRoles={["Admin"]}>
            <div className={styles.adminLayout}>
                <AsideComponent/>
                <main className={styles.mainContent}>{children}</main>
            </div>
        </ProtectedRouteRole>
    );
};

export default AdminLayout;
