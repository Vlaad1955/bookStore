import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Корзина",
  description: "Сторінка де знаходиться корзина",
};
type Props = { children: React.ReactNode };
const BooksLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default BooksLayout;
