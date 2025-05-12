import React from "react";
import { Button } from "../ui/button/Button";
import Image from "next/image";
import { Book } from "@/shared/types/bookTypes/bookTypes";

type BookItemProps = {
  book: Book;
  onClick: (id: string) => void;
};

const BookItem = ({ book, onClick }: BookItemProps) => {
  return (
    <li>
      <Image src={book.image} alt={book.title} width={50} height={50} />
      <strong>{book.title}</strong> — {book.author} — {book.price} грн
      <Button onClick={() => onClick(book.id.toString())}>Go to Book</Button>
    </li>
  );
};

export default BookItem;
