import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Книга",
  description: "Сторінка де знаходяться книга",
};
type Props = { children: React.ReactNode };
const BookLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default BookLayout;
