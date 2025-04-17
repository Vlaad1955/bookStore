import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";
import Image from "next/image";

export async function generateStaticParams() {
  const response = await axiosInstance.get(`/books/list`);
  const data: { id: string }[] = response.data.entities;

  return data.map((list: { id: string }) => ({
    id: list.id.toString(),
  }));
}

async function getOneBook(id: string) {
  const response = await axiosInstance.get(`/books/find/${id}`);
  return response.data;
}

export default async function BookFindOne({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getOneBook(id);
  console.log(book);
  return (
    <>
      <div>HI One Book</div>
      <div>{book.title}</div>
      <Image src={book.image} alt={book.title} width={500} height={500} />
      <div>{book.description}</div>
    </>
  );
}
