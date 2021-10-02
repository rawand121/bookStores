import { useState } from "react";

const AddProd = (props) => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [writer, setWriter] = useState();
  const [category, setCate] = useState("Roman");
  const [language, setLang] = useState("Kurdish");
  const [parts, setParts] = useState();
  const [description, setDesc] = useState();

  const submitForm = () => {
    props.submitForm({
      name,
      price,
      image,
      writer,
      category,
      language,
      image,
      parts,
      description,
    });
  };

  return (
    <>
      <h1 className="text-center">زیادکردنی کتێب</h1>
      <div className="row w-50 mx-auto">
        <div className="mb-3 col-sm-12">
          <label htmlFor="Name" className="form-label">
            ناوی کـتـێـب
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            id="Name"
          />
        </div>
        <div className="mb-3 col-sm-12">
          <label htmlFor="Price" className="form-label">
            نرخی کـتـێـب
          </label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            className="form-control"
            id="Price"
          />
        </div>
        <div className="mb-3 col-sm-12">
          <label htmlFor="formFile" className="form-label">
            وێـنـە
          </label>
          <input
            onChange={(e) => {
              const reader = new FileReader();
              reader.onload = () => {
                if (reader.readyState === 2) {
                  setImage(reader.result);
                }
              };
              reader.readAsDataURL(e.target.files[0]);
            }}
            className="form-control"
            type="file"
            id="formFile"
          />
        </div>
        <div className="mb-3 col-sm-12">
          <label htmlFor="Category" className="form-label">
            جـۆر
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            htmlFor="Category"
            defaultValue="Roman"
            onChange={(e) => setCate(e.target.value)}
          >
            <option value="Roman">ڕۆمـان</option>
            <option value="Dastan">داستان</option>
            <option value="Shi3r">شیعر</option>
          </select>
        </div>
        <div className="mb-3 col-sm-12">
          <label htmlFor="Lang" className="form-label">
            زمـان
          </label>
          <select
            className="form-select"
            aria-label="Default select example"
            htmlFor="Lang"
            defaultValue="Kurdish"
            onChange={(e) => setLang(e.target.value)}
          >
            <option value="Kurdish">کوردی</option>
            <option value="English">ئینگلیزی</option>
            <option value="Arabic">عەرەبی</option>
          </select>
        </div>
        <div className="mb-3 col-sm-12">
          <label htmlFor="Desc" className="form-label">
            کـورتـە
          </label>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            id="Desc"
            style={{ width: "100%" }}
          ></textarea>
        </div>
        <div className="mb-3 col-sm-12">
          <label htmlFor="parts" className="form-label">
            ژمارەی بەرگ
          </label>
          <input
            onChange={(e) => setParts(e.target.value)}
            className="form-control"
            type="number"
            id="parts"
          />
        </div>
        <div className="mb-3 col-sm-12">
          <label htmlFor="writer" className="form-label">
            ناوی نوسەر
          </label>
          <input
            onChange={(e) => setWriter(e.target.value)}
            className="form-control"
            type="text"
            id="writer"
          />
        </div>
        <button
          className="btn mt-4"
          onClick={submitForm}
          style={{ width: "50%", margin: "0 auto" }}
        >
          نـاردن
        </button>
      </div>
    </>
  );
};

export default AddProd;
