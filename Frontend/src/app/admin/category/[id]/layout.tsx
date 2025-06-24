import React from 'react';
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Панель керування категоріями",
    description: "Page about the category",
}
type Props = { children: React.ReactNode }
const CategoryLayout = ({children}: Props) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default CategoryLayout;