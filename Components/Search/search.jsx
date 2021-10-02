import { useState } from "react";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";


const Search = () => {
  const [bookName, setBookName] = useState();
  const [writer, setWriter] = useState();
  const [category, setCategory] = useState();
  const [used, setUsed] = useState("new");
  const router = useRouter();
  const t =
    router.locale === "English" ? English : router.locale === "Kurdish" ? Kurdish : Arabic;
  
  const submitForm = (e) => {
    e.preventDefault();
    let url = `/books?name=${bookName}`;

    if (used === "used") {
      url = `/used-books?name=${bookName}`;
    }

    if (writer) {
      url = url.concat(`&writer=${writer}`);
    }
    if (category) {
      url = url.concat(`&category=${category}`);
    }

    router.push(url);
  };
  return (
    <div className="my-5">
      <h2 className="text-center mb-4">{t.headerSearch}</h2>
      <div className="mx-auto w-50">
        <form>
          <div className="mb-3 d-flex align-items-center">
            <label
              htmlFor="bookName"
              className="form-label"
              style={{ width: "20%" }}
            >
              {t.bookName} :
            </label>
            <input
              type="text"
              className="form-control"
              id="bookName"
              placeholder="Required"
              onChange={(e) => setBookName(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label
              htmlFor="writerName"
              className="form-label"
              style={{ width: "20%" }}
            >
              Writer :
            </label>
            <input
              type="text"
              className="form-control"
              id="writerName"
              placeholder="Not Required"
              onChange={(e) => setWriter(e.target.value)}
            />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label
              htmlFor="category"
              className="form-label"
              style={{ width: "20%" }}
            >
              {t.categorySection} :
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Not Required</option>
              <option value="roman">{t.novelCategory}</option>
              <option value="dastan">{t.epicCategory}</option>
              <option value="shi3r">{t.poemCategory}</option>
            </select>
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label
              htmlFor="category"
              className="form-label"
              style={{ width: "20%" }}
            >
              {t.usedBooks} :
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setUsed(e.target.value)}
            >
              <option value="new">{t.usedbooksNew}</option>
              <option value="used">{t.usedbooksUsed}</option>
            </select>
          </div>
          {bookName ? (
            <button onClick={submitForm} className="btn my-5">
              {t.submitButton}
            </button>
          ) : (
            <button disabled className="btn my-5">
              {t.submitButton}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Search;
