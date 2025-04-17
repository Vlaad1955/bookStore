import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>Home</div>
      <Link href={"/dashboard/categories"}>Category</Link>
      <br />
      <Link href={"/dashboard/books"}>Books</Link>
    </>
  );
}
