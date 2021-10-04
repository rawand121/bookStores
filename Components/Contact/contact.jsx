import { useRouter } from "next/router";
import { useRef } from "react";
import emailjs from 'emailjs-com';
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";


const Contact = () => {
  const form = useRef()

  const {locale} = useRouter()
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;
    
    const submitForm = (e) => {
      e.preventDefault();

      emailjs.sendForm('gmail', 'template_3d9okss', form.current, 'user_CIJumnFSZGt6Ww37qqAo6')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset()
    }

  return (
    <div className="my-5">
      <h2 className="text-center mb-4">{t.headerContactus}</h2>
      <div className="mx-auto w-50">
        <form onSubmit={submitForm} ref={form} className='contactForm'>
          <div className="mb-3 d-flex align-items-center">
            <label
              htmlFor="name"
              className="form-label"
              style={{ width: "25%" }}
            >
              {t.name}
            </label>
            <input type="text" className="form-control" id="name" name="user_name" />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label
              htmlFor="Email"
              className="form-label"
              style={{ width: "25%" }}
            >
              {t.emailAdress}
            </label>
            <input type="email" className="form-control" id="Email" name="user_email" />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label
              htmlFor="Subject"
              className="form-label"
              style={{ width: "25%" }}
            >
              {t.subject}
            </label>
            <input type="text" className="form-control" id="Subject" name="subject" />
          </div>
          <div className="mb-3 d-flex align-items-center">
            <label
              htmlFor="Message"
              className="form-label"
              style={{ width: "25%" }}
            >
              {t.message}
            </label>
            <textarea
              className="form-control"
              id="Message"
              style={{ height: "100px" }}
              name="message"
            ></textarea>
          </div>
          <button className="btn my-5">{t.submitButton}</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
