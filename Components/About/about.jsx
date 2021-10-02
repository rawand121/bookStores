import Image from "next/image";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";


const About = () => {
  const {locale} = useRouter()
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;
  return (
    <div className="row">
      <div className="col-sm-12 col-md-6 position-relative text-center">
        <Image
          src="/images/Xom.jpg"
          height="350px"
          width="400px"
          quality="100"
        />
        <br />
        <h3>Rawand Rebwar ({t.developer})</h3>
        <p>{t.developerDescription}</p>
        <a
          className="btn btn-primary"
          style={{
            backgroundColor: "#502E2D",
            color: "#e7a545",
            width: "30%",
          }}
        >
          {t.contactButton}
        </a>
      </div>
      <div className="col-sm-12 col-md-6 position-relative text-center">
        <Image
          src="/images/Kale.jpg"
          height="350px"
          width="400px"
          quality="100"
        />
        <br />
        <h3>Kale Muhamad ({t.founder})</h3>
        <p>{t.founderDescription}</p>
        <a
          className="btn btn-primary"
          style={{
            backgroundColor: "#502E2D",
            color: "#e7a545",
            width: "30%",
          }}
        >
          {t.contactButton}
        </a>
      </div>
    </div>
  );
};

export default About;
