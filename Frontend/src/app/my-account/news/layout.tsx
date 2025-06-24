import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Новини",
  description: "Сторінка де знаходяться новини",
};
type Props = { children: React.ReactNode };
const NewsLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default NewsLayout;
