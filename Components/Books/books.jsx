import Post from "./post";
import PaginationBar from "./pagination";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";
import Filter from "./filter";

const Books = () => {
  const [Reload, setReload] = useState(false);

  const router = useRouter();
  const t =
    router.locale === "English"
      ? English
      : router.locale === "Kurdish"
      ? Kurdish
      : Arabic;

  const { books, error } = useSelector((state) => state.Books);

  if (error === "Nothing Found match with your search :( ") {
    return (
      <h1 style={{ height: "75vh", textAlign: "center", marginTop: "30px" }}>
        {error}
      </h1>
    );
  }

  if (books && Object.keys(books).length === 0) {
    return <Spinner />;
  }

  if (books.books)
    return (
      <div className="my-5">
        <div>
          <h2 className="text-center" style={{ flex: 1 }}>
            {t.allBooks}
          </h2>
          <Filter />
        </div>
        <div className="row justify-content-sm-center my-4">
          {books.books.map((post) => {
            return <Post key={post._id} book={post} />;
          })}
        </div>
        <PaginationBar pages={books.pageCount} />
      </div>
    );
};

export default Books;
