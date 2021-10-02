import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Spinner from "../spinner/Spinner";
import { useRouter } from "next/router";
import axios from "axios";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";


const Form = () => {
  const [current, setCurrent] = useState();
  const [newPass, setNewPass] = useState();
  const [confirmNewPass, setConfirm] = useState();
  const {locale} = useRouter()

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [isNotMatch, setNotMatch] = useState(false);

  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;
  
  useEffect(() => {
    if (error) {
      toast.error(error);
      setError(null);
    }
    if (success) {
      toast.success("Password Changed Succesfully");
      setSuccess(false);
    }
  }, [error, success]);

  const submitChange = async () => {
    if (newPass !== confirmNewPass) {
      setNotMatch(true);
    } else {
      try {
        setNotMatch(false);
        setLoading(true);
        await axios.post("/api/update-password", {
          current,
          newPass,
          confirmNewPass,
        });
        setLoading(false);
        setSuccess(true);
        setError(null);
      } catch (err) {
        setLoading(false);
        setSuccess(false);
        setError(err.response.data.message);
      }
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <h1 className="text-center mt-3 mb-5">{t.updatePassword}</h1>
      <div className="row mb-3">
        <label htmlFor="inputCurrent" className="col-sm-3 col-form-label">
          {t.currentPassword}
        </label>
        <div className="col-sm-9">
          <input
            type="password"
            className="form-control"
            id="inputCurrent"
            onChange={(e) => setCurrent(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="inputNew" className="col-sm-3 ol-form-label">
          {t.newPassword}
        </label>
        <div className="col-sm-9">
          <input
            type="password"
            className="form-control"
            id="inputNew"
            onChange={(e) => setNewPass(e.target.value)}
          />
        </div>
      </div>
      <div className="row mb-3">
        <label htmlFor="validationServer03" className="form-label col-sm-3">
          {t.confirmPassword}
        </label>
        <div className="col-sm-9">
          <input
            type="password"
            className="form-control"
            id="validationServer03"
            aria-describedby="validationServer03Feedback"
            onChange={(e) => setConfirm(e.target.value)}
          />
          {isNotMatch ? (
            <p className="text-danger mt-2">Your New Passwords is not same..</p>
          ) : null}
        </div>
      </div>
      <button className="btn w-50 mx-auto d-block mt-5" onClick={submitChange}>
        {t.submitButton}
      </button>
    </>
  );
};

export default Form;
