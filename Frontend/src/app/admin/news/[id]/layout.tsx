import React from 'react';
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "News page",
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