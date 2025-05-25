import React from "react";
import { Button } from "../ui/button/Button";
import Image from "next/image";
import { Book } from "@/shared/types/bookTypes/bookTypes";

interface BooksItemProps {
  book: Book;
}

const BookItem: React.FC<BooksItemProps> = ({ book }) => {
  return (
    <div>
      <div>HI One Book</div>
      <div>{book.title}</div>
      <Button>Added to Basket</Button>

      <Image src={book.image} alt={book.title} width={500} height={500} />
      <div>{book.description}</div>
    </div>
  );
};

export default BookItem;
