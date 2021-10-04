import Post from "./post";
import PaginationBar from "./pagination";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";


const Books = () => {
  const {locale} = useRouter()
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;

  const { books, error } = useSelector((state) => state.Books);

  if (error === "Nothing Found match with your search :( ") {
    return (
      <h1 style={{ height: "75vh", textAlign: "center", marginTop: "30px" }}>
        {error}
      </h1>
    );
  }
  if (books)
    return (
      <div className="my-5">
        <h2 className="text-center">{t.allBooks}</h2>
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
