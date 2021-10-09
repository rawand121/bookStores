import axios from "../../AxiosConfig";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import classes from "./details.module.css";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";

const Relatedbooks = (props) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { locale } = useRouter();

  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;
  useEffect(async () => {
    try {
      const { data } = await axios.get(
        `/api/books/relatedBooks?category=${props.category}&bookId=${props.id}`
      );
      setBooks(data.books);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError(err.response.data.message);
    }
  }, []);
  if (error) {
    return (
      <div style={{ height: "75vh" }}>
        <h1>{error}</h1>
      </div>
    );
  }
  if (loading) return <Spinner />;
  return (
    <>
      {books.map((book) => {
        if (book !== null) {
          return (
            <div key={book._id} className={"card mb-2 " + classes.relatedBooks}>
              <div className="row g-0">
                <div className="col-md-4 text-center">
                  <Image
                    src={book.image.url}
                    alt="IMG"
                    height="200"
                    width="150"
                  />
                </div>
                <div className="col-md-8 d-flex flex-column pb-3">
                  <div className="card-body">
                    <Link href={`/books/${book._id}`}>
                      <h5 className="card-title" style={{ cursor: "pointer" }}>
                        {book.name}
                      </h5>
                    </Link>
                    <p className={"card-text " + classes.description}>
                      {book.description.substring(0, 50) + "..."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default Relatedbooks;
