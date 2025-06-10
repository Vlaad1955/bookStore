import {getOneBook} from "@/admin/books/api/books";
import EditBookForm from "@/admin/books/components/edit-form/EditBookForm";

export default async function EditBookPage({ params }: { params: { id: string } }) {
    const {id} = params;

    const book = await getOneBook(id);

    if (!book) {
        return <p>Книга не знайдена.</p>;
    }

    return <EditBookForm book={book} />;
}
