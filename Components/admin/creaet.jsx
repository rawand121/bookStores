import { useEffect, useState } from "react";
import axios from "../../AxiosConfig";
import { toast } from "react-toastify";

const CreateUser = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [createAdmin, setCreateAdmin] = useState("bookstore");

  useEffect(() => {
    if (success) {
      toast.success("Successfully Created");
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const submitForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/admin/create", {
        name,
        email,
        password,
        phoneNumber,
        address: createAdmin ? address : null,
      });
      setError(null);
      setSuccess(true);
      setLoading(false);
      setTimeout(() => {
        document.location.reload();
      }, 1500);
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
      setSuccess(false);
    }
  };

  return (
    <>
      <form className="row g-3">
        <h2 className="text-center">دروست کردنت هەژمار</h2>
        <div className="col-md-6">
          <label htmlFor="inputName" className="form-label">
            ناو
          </label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            ئیمەیڵ
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputPassword" className="form-label">
            وشەی نهێنی
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="col-6">
          <label htmlFor="inputPhone" className="form-label">
            ژمارەی تەلەفۆن
          </label>
          <input
            type="text"
            className="form-control"
            id="inputPhone"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        {createAdmin === "bookstore" ? (
          <div className="col-md-6">
            <label htmlFor="inputAddress" className="form-label">
              ناونیشان
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="سلێمانی - بەردەرکی سەرا"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        ) : null}
        <div className="col-12">
          <label htmlFor="Role" className="form-label">
            ڕۆڵ
          </label>
          <select
            id="Role"
            className="form-select"
            onChange={(e) => setCreateAdmin(e.target.value)}
          >
            <option style={{ fontSize: "20px" }} value="bookstore">
              کـتـێـبـخـانـە
            </option>
            <option style={{ fontSize: "20px" }} value="admin">
              ئـەدمـین
            </option>
          </select>
        </div>
        <div className="col-6 mx-auto mt-5">
          {loading ? (
            <button type="submit" className="btn">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </button>
          ) : (
            <button type="submit" className="btn " onClick={submitForm}>
              زیادکردن
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default CreateUser;
