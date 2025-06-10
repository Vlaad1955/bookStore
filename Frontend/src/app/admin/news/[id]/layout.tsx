import React from 'react';
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Панель керування новинами",
    description: "Page about the news",
}
type Props = { children: React.ReactNode }
const NewsLayout = ({children}: Props) => {
    return (
        <div>
                {children}
        </div>
    );
};

export default NewsLayout;