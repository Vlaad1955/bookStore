import React from 'react';
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Панель керування товарами",
    description: "Page about the books",
}
type Props = { children: React.ReactNode }
const BooksLayout = ({children}: Props) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default BooksLayout;