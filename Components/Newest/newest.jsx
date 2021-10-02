import Post from "./post";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";


const Newest = () => {
  const { books } = useSelector((state) => state.Latest);
  const {locale} = useRouter()
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;

  return (
    <div className="my-5">
      <h3>{t.latestBooks}</h3>
      <div className="d-flex justify-content-between my-4">
        {books.books.map((post) => {
          return <Post key={post._id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default Newest;
