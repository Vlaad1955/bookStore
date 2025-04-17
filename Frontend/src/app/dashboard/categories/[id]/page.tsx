import axiosInstance from "@/shared/auth/auth-axios-instance/axiosInstance";
import Image from "next/image";

export async function generateStaticParams() {
  const response = await axiosInstance.get(`/category/list`);
  const data: { id: string }[] = response.data.entities;

  return data.map((category) => ({
    id: category.id.toString(),
  }));
}

async function getAllBooks() {
  const response = await axiosInstance.get(`/books/list`, {
    params: {
      limit: 1000, // або розбити на кілька запитів, якщо книг дуже багато
    },
  });
  return response.data.entities;
}

async function getCategory(id: string) {
  const response = await axiosInstance.get(`/category/find/id/${id}`);
  return response.data;
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const category = await getCategory(id);
  const allBooks = await getAllBooks();

  // 🔎 Фільтруємо книги за наявністю категорії з цим id
  const filteredBooks = allBooks.filter((book: any) =>
    book.categories?.some((cat: any) => cat.id === id)
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Книги в категорії: {category.name}
      </h1>
      {filteredBooks.length === 0 ? (
        <p>Немає книг у цій категорії.</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filteredBooks.map((book: any) => (
            <div key={book.id} className="border p-2 rounded shadow">
              <h2 className="font-semibold">{book.title}</h2>
              <Image
                src={book.image}
                alt={book.title}
                width={150}
                height={200}
              />
              <p className="text-sm text-gray-600">{book.author}</p>
              <p className="text-md font-bold">{book.price} грн</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
