import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Оновлення паролю",
  description: "Сторінка для оновлення паролю",
};
type Props = { children: React.ReactNode };
const UpdatePasswordLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default UpdatePasswordLayout;
