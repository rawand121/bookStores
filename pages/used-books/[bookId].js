import Layout from "../../Components/layout/layout";
import Footer from "../../Components/Footer/footer";
import BookDetails from "../../Components/usedBooks/details";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Spinner from "../../Components/spinner/Spinner";
import Image from "next/image";

export default function Book_Details(props) {
  const [book, setBook] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bookId = useRouter().query.bookId;

  useEffect(async () => {
    if (bookId) {
      try {
        const { data } = await axios.get("/api/usedBooks/" + bookId);
        setBook(data);
        setLoading(false);
        setError(null);
      } catch (err) {
        setBook(null);
        setError(err.response.data.message);
        setLoading(false);
      }
    }
  }, [bookId]);

  return (
    <Layout title={book && book.name ? book.name : "Book Was Not Found"}>
      <div className="container">
        {error !== null ? (
          <div style={{ height: "75vh" }}>
            <div className="d-flex align-items-center justify-content-around">
              <h1>{error}</h1>
              <Image
                src="https://res.cloudinary.com/rawand121/image/upload/v1630686009/BookStore/5203299_pcgdp2.jpg"
                height="400px"
                width="400px"
              />
            </div>
          </div>
        ) : loading ? (
          <Spinner />
        ) : (
          <BookDetails book={book} />
        )}
      </div>
      <Footer />
    </Layout>
  );
}

// export const getServerSideProps = async ({ locale }) => {
//   return {
//     props: {
//       language: locale,
//     },
//   };
// };
