import {getOneBook} from "@/shared/admin/books/books-api";
import EditBookForm from "@/components/admin/bookForm/EditBookForm";

export default async function EditBookPage({ params }: { params: { id: string } }) {
    const {id} = await params;

    const book = await getOneBook(id);

    if (!book) {
        return <p>Книга не знайдена.</p>;
    }

    return <EditBookForm book={book} />;
}
