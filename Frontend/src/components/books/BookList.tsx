"use client";

import { Button } from "../ui/button/Button";
import Image from "next/image";
import { Book } from "@/shared/types/bookTypes/bookTypes";
import { useBasketStore } from "@/shared/api/basket/basket-store";
import { useRouter } from "next/navigation";

type BookItemProps = {
  book: Book;
};

const BookList = ({ book }: BookItemProps) => {
  const { addToBasket } = useBasketStore();

  const router = useRouter();

  const handleClick = (id: string) => {
    router.push(`/dashboard/books/${id}`);
  };

  return (
    <li>
      <Image src={book.image} alt={book.title} width={50} height={50} />
      <strong>{book.title}</strong> — {book.author} — {book.price} грн
      <Button onClick={() => handleClick(book.id.toString())}>
        Go to Book
      </Button>
      <Button onClick={() => addToBasket(book.id.toString(), 1)}>
        Added to Basket +1
      </Button>
      <Button onClick={() => addToBasket(book.id.toString(), -1)}>
        Remove into Basket -1
      </Button>
    </li>
  );
};

export default BookList;
