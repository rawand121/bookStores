import { useState } from "react";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";

const UsedBooksForm = (props) => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [language, setLanguage] = useState();
  const [parts, setParts] = useState();
  const [category, setCategory] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [address, setAddress] = useState();
  const [typeOfTransaction, setType] = useState();
  const { locale } = useRouter();
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;

  const submitForm = (e) => {
    e.preventDefault();
    props.submitForm({
      name,
      price,
      category,
      language,
      description,
      address,
      typeOfTransaction: document.querySelector(
        'input[name="typeOfTransaction"]:checked'
      ).value,
      image,
      parts,
    });
  };

  return (
    <div>
      <h1 className="text-center mb-5">{t.sellmybookChoice}</h1>
      <div className="row mb-3">
        <label htmlFor="inputName" className="col-sm-2 col-form-label">
          {t.name}
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="inputName"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      {typeOfTransaction === "sell" && (
        <div className="row mb-3">
          <label htmlFor="Price" className="col-sm-2 col-form-label">
            {t.price}
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>
      )}
      <div className="row mb-3">
        <label htmlFor="formFile " className="col-sm-2 form-label">
          {t.categorySection}
        </label>
        <div className="col-sm-10">
          <select
            className="form-select col-sm-10"
            aria-label="Default select example"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>{t.categoryBranches}</option>
            <option value="Roman">{t.novelCategory}</option>
            <option value="Dastan">{t.epicCategory}</option>
            <option value="Shi3r">{t.poemCategory}</option>
          </select>
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="Language" className="col-sm-2 col-form-label">
          {t.language}
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="Language"
            onChange={(e) => setLanguage(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="Address" className="col-sm-2 col-form-label">
          {t.streetAddress}
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="Parts" className="col-sm-2 col-form-label">
          {t.parts}
        </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="Parts"
            onChange={(e) => setParts(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="formFile " className="col-sm-2 form-label">
          {t.image}
        </label>
        <div className="col-sm-10">
          <input
            className="form-control "
            type="file"
            id="formFile"
            onChange={(e) => {
              const reader = new FileReader();
              reader.onload = () => {
                if (reader.readyState === 2) {
                  setImage(reader.result);
                }
              };
              reader.readAsDataURL(e.target.files[0]);
            }}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="Description" className="col-sm-2 col-form-label">
          {t.description}
        </label>
        <div className="col-sm-10">
          <textarea
            type="text"
            className="form-control"
            id="Description"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
      </div>
      <fieldset className="row my-4">
        <legend className="col-form-label col-sm-3 pt-0">What You Want</legend>
        <div className="col-sm-9 d-flex justify-content-around">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="typeOfTransaction"
              id="sell"
              value="sell"
              onChange={() => setType("sell")}
            />
            <label className="form-check-label" htmlFor="sell">
              {t.sellmybookChoice}
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="typeOfTransaction"
              id="exchange"
              value="exchange"
              onChange={() => setType("exchange")}
            />
            <label className="form-check-label" htmlFor="exchange">
              {t.exchangemybookChoice}
            </label>
          </div>
        </div>
      </fieldset>
      {name &&
      language &&
      parts &&
      category &&
      description &&
      image &&
      address &&
      typeOfTransaction ? (
        <button onClick={submitForm} type="submit" className="btn btn-primary">
          {t.submitButton}
        </button>
      ) : (
        <button disabled="true" className="btn">
          {t.submitButton}
        </button>
      )}
    </div>
  );
};

export default UsedBooksForm;
