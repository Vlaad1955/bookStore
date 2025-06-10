import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Перелік книг",
  description: "Сторінка де знаходяться книги",
};
type Props = { children: React.ReactNode };
const BooksLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default BooksLayout;
