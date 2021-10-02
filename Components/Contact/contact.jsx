import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";


const Contact = () => {
  const {locale} = useRouter()
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;
  return (
    <div className="my-5">
      <h2 className="text-center mb-4">{t.headerContactus}</h2>
      <div className="mx-auto w-50">
        <form>
          <div className="mb-3 d-flex align-items-center">
            <label
              htmlFor="name"
              className="form-label"
              style={{ width: "15%" }}
            >
              {t.name} :
            </label>
            <input type="text" className="form-control" id="name" />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label
              htmlFor="Email"
              className="form-label"
              style={{ width: "15%" }}
            >
              {t.emailAdress} :
            </label>
            <input type="email" className="form-control" id="Email" />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label
              htmlFor="Subject"
              className="form-label"
              style={{ width: "15%" }}
            >
              {t.subject} :
            </label>
            <input type="text" className="form-control" id="Subject" />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label
              htmlFor="Message"
              className="form-label"
              style={{ width: "15%" }}
            >
              {t.message} :
            </label>
            <textarea
              className="form-control"
              id="Message"
              style={{ height: "100px" }}
            ></textarea>
          </div>
          <button className="btn my-5">{t.submitButton}</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
