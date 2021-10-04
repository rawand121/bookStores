import Post from "./post";
import PaginationBar from "../pagination/pagination";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";


const Books = () => {
  const { books, error } = useSelector((state) => state.UsedBooks);
  const {locale} = useRouter()
  
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;
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
        <h2 className="text-center">{t.usedBooks}</h2>
        <div className="row my-4">
          {books.books.map((post) => {
            return <Post key={post._id} book={post} />;
          })}
        </div>
        <PaginationBar
          pages={books.pageCount}
          url="https://book-stores.vercel.app/used-books"
        />
      </div>
    );
};

export default Books;
