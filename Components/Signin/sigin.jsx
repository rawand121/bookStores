import { useState } from "react";
import Image from "next/image";
import classes from "./signin.module.css";
import { useDispatch } from "react-redux";
import { signIn } from "next-auth/client";
import { toast } from "react-toastify";
import { LoadUser } from "../../redux/actions/index";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  
  const t =
    router.locale === "English" ? English : router.locale === "Kurdish" ? Kurdish : Arabic;
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: email.toLowerCase(),
      password,
    });
    if (result.error) {
      setLoading(false);
      toast.error(result.error);
    } else {
      dispatch(LoadUser());
      setLoading(false);
      toast.success("Success Logged In.");
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  return (
    <>
      <h1 className="text-center">{t.headerSignin}</h1>
      <div className="row">
        <div className="col-sm-12 col-md-6 text-center d-flex align-items-center">
          <div style={{ width: "80%" }}>
            <div className="mb-5 d-flex align-items-center">
              <label
                htmlFor="exampleInputEmail1"
                className={classes.label + " form-label"}
              >
                {t.emailAdress}
              </label>
              <input
                type="email"
                className={classes.input + " form-control"}
                onChange={(e) => setEmail(e.target.value)}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-5 d-flex align-items-center">
              <label
                htmlFor="exampleInputPassword1"
                className={classes.label + " form-label"}
              >
                {t.password}
              </label>
              <input
                type="password"
                className={classes.input + " form-control"}
                onChange={(e) => setPassword(e.target.value)}
                id="exampleInputPassword1"
              />
            </div>
            {loading ? (
              <button type="submit" className="btn">
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

export default Signin;
