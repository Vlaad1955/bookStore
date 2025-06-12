import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Мої коментарі",
  description: "Сторінка де знаходяться коментарі користувача",
};
type Props = { children: React.ReactNode };
const MyCommentsLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default MyCommentsLayout;
