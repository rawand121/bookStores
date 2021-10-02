import Link from "next/link";
import classes from "./address.module.css";
import { useState, useEffect } from "react";
import { setOrder } from "../../redux/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";


const AddressForm = () => {
  const [street, setStreet] = useState();
  const [address, setAddress] = useState();
  const [note, setNote] = useState();
  const [longitude, setLong] = useState(45.434639);
  const [latitude, setLat] = useState(35.569641);
  const dispatch = useDispatch();
  const { success, loading, error } = useSelector((state) => state.Orders);
  const router = useRouter();

  const t =
    router.locale === "English" ? English : router.locale === "Kurdish" ? Kurdish : Arabic;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Succesfully Ordered");
      setTimeout(() => {
        router.push("/orders");
      }, 2000);
    }
  }, [error, loading, success]);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(setOrder({ street, address, longitude, latitude }, note));
  };

  return (
    <form className="row g-3 mx-auto" style={{ width: "60%" }}>
      <div className="col-md-12  mx-auto">
        <label htmlFor="Address Street" className="form-label">
          {t.streetAddress}
        </label>
        <input
          onChange={(e) => setStreet(e.target.value)}
          type="text"
          className="form-control"
          id="Address Street"
        />
      </div>
      <div className="col-md-12  mx-auto">
        <label htmlFor="Address" className="form-label">
          {t.fullAdress}
        </label>
        <input
          onChange={(e) => setAddress(e.target.value)}
          type="text"
          className="form-control"
          id="Address"
        />
      </div>
      <div className="col-md-12  mx-auto">
        <label htmlFor="inputName" className="form-label">
          {t.note}
        </label>
        <textarea
          type="text"
          onChange={(e) => setNote(e.target.value)}
          className="form-control"
          id="inputName"
          style={{ height: "200px", resize: "none" }}
        />
      </div>
      <div className="row">
        <div className="col-sm-12 my-3">
          <Link href="/map">
            <button className={"btn " + classes.buttonLocation}>
              {t.getLocation}
            </button>
          </Link>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="input-group mb-3">
            <span className="input-group-text">LAT</span>
            <input
              type="text"
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
              defaultValue="35.569641"
              disabled
            />
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div className="input-group mb-3 ">
            <span className="input-group-text">LONG</span>
            <input
              type="text"
              className="form-control"
              aria-label="Amount (to the nearest dollar)"
              defaultValue="45.434639"
              disabled
            />
          </div>
        </div>
      </div>
      {loading ? (
        <button
          className="btn my-4"
          style={{ width: "20%", margin: "0 auto", display: "block" }}
        >
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </button>
      ) : (
        <button
          className="btn my-4"
          style={{ width: "20%", margin: "0 auto", display: "block" }}
          onClick={submitForm}
        >
          Order Now
        </button>
      )}
    </form>
  );
};

export default AddressForm;
