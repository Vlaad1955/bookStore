import React from 'react';
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Панель керування користувачами",
    description: "Page about the users",
}
type Props = { children: React.ReactNode }
const UsersLayout = ({children}: Props) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default UsersLayout;