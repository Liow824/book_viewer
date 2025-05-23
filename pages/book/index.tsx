// pages/book/index.tsx
import { GetServerSideProps } from "next";
import Link from "next/link";
import { Book } from "../../types/book";

interface BooksPageProps {
  books: Book[];
}

export default function BooksPage({ books }: BooksPageProps) {
  // Format date to DD/MM/YYYY
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Books List</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2 text-left">Title</th>
            <th className="border p-2 text-left">Author</th>
            <th className="border p-2 text-left">Genre</th>
            <th className="border p-2 text-left">Description</th>
            <th className="border p-2 text-left">ISBN</th>
            <th className="border p-2 text-left">Published Date</th>
            <th className="border p-2 text-left">Publisher</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id} className="hover:bg-gray-50">
              <td className="border p-2">
                <Link href={`/book/${book.id}`} className="text-blue-500 hover:underline">
                  {book.title}
                </Link>
              </td>
              <td className="border p-2">{book.author}</td>
              <td className="border p-2">{book.genre}</td>
              <td className="border p-2">{book.description}</td>
              <td className="border p-2">{book.isbn}</td>
              <td className="border p-2">{formatDate(book.published)}</td>
              <td className="border p-2">{book.publisher}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const res = await fetch("https://fakerapi.it/api/v1/books?_quantity=10"); // Fetch 10 books
    const data = await res.json();
    const books: Book[] = data.data;

    return {
      props: {
        books,
      },
    };
  } catch (error) {
    console.error("Error fetching books:", error);
    return {
      props: {
        books: [],
      },
    };
  }
};