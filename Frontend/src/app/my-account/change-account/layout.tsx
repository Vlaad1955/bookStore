import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Зміна акаунту",
  description: "Сторінка де знаходяться зміна акаунту",
};
type Props = { children: React.ReactNode };
const ChangeAccountLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default ChangeAccountLayout;
