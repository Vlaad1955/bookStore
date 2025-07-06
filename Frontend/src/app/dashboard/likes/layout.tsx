import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Перелік вподобань",
  description: "Сторінка де знаходяться вподобання",
};
type Props = { children: React.ReactNode };
const LikesLayout = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default LikesLayout;
