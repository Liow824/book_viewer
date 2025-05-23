// pages/book/[id].tsx
import { GetServerSideProps } from "next";
import { Book } from "../../types/book";

interface BookPageProps {
  book: Book | null;
}

export default function BookPage({ book }: BookPageProps) {
  if (!book) {
    return <div className="container mx-auto p-4">Book not found</div>;
  }

  // Format date to DD/MM/YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={book.image}
          alt={book.title}
          className="w-full md:w-1/3 h-auto rounded-lg"
        />
        <div className="flex-1">
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Description:</strong> {book.description}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
          <p><strong>Published Date:</strong> {formatDate(book.published)}</p>
          <p><strong>Publisher:</strong> {book.publisher}</p>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  try {
    const res = await fetch(`https://fakerapi.it/api/v1/books?_quantity=1&ids=${id}`);
    const data = await res.json();
    const book: Book | null = data.data[0] || null;

    return {
      props: {
        book,
      },
    };
  } catch (error) {
    console.error("Error fetching book:", error);
    return {
      props: {
        book: null,
      },
    };
  }
};