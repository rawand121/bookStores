import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import classes from "../Signin/signin.module.css";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/index";
import { useRouter } from "next/router";

import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";

const Signup = () => {
  const { locale } = useRouter();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });
  const dispatch = useDispatch();
  const { error, loading, success } = useSelector((state) => state.Signup);

  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success("Your Account was created..");
    }
  }, [dispatch, error, success]);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submitHandler = () => {
    if (
      user.confirmPassword &&
      user.password &&
      user.confirmPassword === user.password &&
      user.email &&
      user.name &&
      user.phoneNumber
    ) {
      if (user.phoneNumber.trim().length === 10) {
        dispatch(registerUser(user));
      } else {
        toast.error("Enter Valid Phone Number Please.");
      }
    } else {
      toast.error("Passwords is not match..");
    }
  };

  return (
    <>
      <h1 className={classes.signupHeader}>{t.headerSignup}</h1>
      <div className="row">
        <div className="col-sm-12 col-md-6 text-center d-flex align-items-center mt-3">
          <div className={classes.signupForm}>
            <div className="mb-4 d-flex align-items-center">
              <label
                htmlFor="exampleInputUsername"
                className={classes.label + " form-label"}
              >
                {t.username}
              </label>
              <input
                type="text"
                name="name"
                className={classes.input + " form-control"}
                onChange={onChange}
                id="exampleInputUsername"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-4 d-flex align-items-center">
              <label
                htmlFor="exampleInputEmail1"
                className={classes.label + " form-label"}
              >
                {t.emailAdress}
              </label>
              <input
                name="email"
                type="email"
                className={classes.input + " form-control"}
                onChange={onChange}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-4 d-flex align-items-center">
              <label
                htmlFor="exampleInputPhone"
                className={classes.label + " form-label"}
              >
                {t.phoneNumber}
              </label>
              <input
                name="phoneNumber"
                type="text"
                className={classes.input + " form-control"}
                placeholder="7701234567"
                onChange={onChange}
                id="exampleInputPhone"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-4 d-flex align-items-center">
              <label
                htmlFor="exampleInputPassword1"
                className={classes.label + " form-label"}
              >
                {t.password}
              </label>
              <input
                name="password"
                type="password"
                className={classes.input + " form-control"}
                onChange={onChange}
                id="exampleInputPassword1"
              />
            </div>
            <div className="mb-4 d-flex align-items-center">
              <label
                htmlFor="exampleInputPassword2"
                className={classes.label + " form-label"}
              >
                {t.confirmPassword}
              </label>
              <input
                name="confirmPassword"
                type="password"
                onChange={onChange}
                className={classes.input + " form-control"}
                id="exampleInputPassword2"
              />
            </div>
            {loading ? (
              <button className="btn">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </button>
            ) : (
              <button type="submit" className="btn" onClick={submitHandler}>
                {t.submitButton}
              </button>
            )}
          </div>
        </div>
        <div className="col-sm-12 col-md-6 text-center">
          <Image
            src="/images/Signin.jpg"
            height="500px"
            width="500px"
            quality="100"
          />
        </div>
      </div>
    </>
  );
};

export default Signup;
