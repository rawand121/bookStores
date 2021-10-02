import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../spinner/Spinner";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const UpdateForm = ({ book }) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [language, setLanguage] = useState();
  const [parts, setParts] = useState();
  const [category, setCategory] = useState();
  const [writer, setWriter] = useState();
  const [description, setDesc] = useState();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("بە سەرکەوتووی جێبەجێ بوو..");
    }
  }, [success, error]);

  const submitUpdate = async () => {
    setLoading(true);
    try {
      await axios.put(`/api/admin/books/${book._id}`, {
        name,
        price,
        language,
        parts,
        category,
        writer,
        description,
      });

      setError(null);
      setSuccess(true);
      setLoading(false);
      router.push("/admin/books");
    } catch (err) {
      setError(err.response.data.message);
      setSuccess(false);
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="my-5">
      <h2 className="text-center mb-4">نوێ کردنەوە</h2>
      <div className="mx-auto w-50">
        <div className="mb-3 d-flex align-items-center">
          <label htmlFor="name" className="form-label" style={{ width: "15%" }}>
            ناو :
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            defaultValue={book.name}
            className="form-control"
            id="name"
          />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label
            htmlFor="price"
            className="form-label"
            style={{ width: "15%" }}
          >
            نرخ :
          </label>
          <input
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            defaultValue={book.price}
            className="form-control"
            id="price"
          />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label
            htmlFor="category"
            className="form-label"
            style={{ width: "15%" }}
          >
            جۆر :
          </label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="form-select"
            defaultValue={book.category}
            aria-label="Default select example"
          >
            <option value="Dastan">Dastan</option>
            <option value="Roman">Roman</option>
            {/* <option value="3">Three</option> */}
          </select>
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label
            htmlFor="language"
            className="form-label"
            style={{ width: "15%" }}
          >
            زمان :
          </label>
          <select
            className="form-select"
            defaultValue={book.language}
            aria-label="Default select example"
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="English">English</option>
            <option value="Kurdish">Kuridish</option>
            <option value="Arabic">Arabic</option>
          </select>
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label
            htmlFor="description"
            className="form-label"
            style={{ width: "15%" }}
          >
            دەربارە :
          </label>
          <textarea
            onChange={(e) => setDesc(e.target.value)}
            defaultValue={book.description}
            className="form-control"
            id="description"
            style={{ minHeight: "170px" }}
          ></textarea>
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label
            htmlFor="parts"
            className="form-label"
            style={{ width: "15%" }}
          >
            ژمارەی بەرگ :
          </label>
          <input
            onChange={(e) => setParts(e.target.value)}
            type="text"
            defaultValue={book.parts}
            className="form-control"
            id="parts"
          />
        </div>
        <div className="mb-3 d-flex align-items-center">
          <label
            htmlFor="writer"
            className="form-label"
            style={{ width: "15%" }}
          >
            نوسەر :
          </label>
          <input
            onChange={(e) => setWriter(e.target.value)}
            type="text"
            defaultValue={book.writer}
            className="form-control"
            id="writer"
          />
        </div>
        <button className="btn my-5" onClick={submitUpdate}>
          نوێ کردنەوە
        </button>
      </div>
    </div>
  );
};

export default UpdateForm;
