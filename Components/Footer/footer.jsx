import { useRouter } from "next/router";
import classes from "./footer.module.css";
import Image from "next/image";

import en from "../../translate/english";
import ku from "../../translate/kurdish";
import ar from "../../translate/arabic";

const Footer = () => {
  const router = useRouter();
  const { locale } = router;
  const t = locale === "English" ? en : locale === "Kurdish" ? ku : ar;
  return (
    <div
      style={{
        backgroundColor: "#502E2D",
        marginTop: "50px",
        padding: "40px 40px 20px",
      }}
    >
      <div className={classes.footerRow + " row"}>
        <div className={"col-sm-12 col-md-6 " + router.locale ==='English' ? "ms-auto" : "me-auto"}>
          <p className={classes.textDiv}>{t.footerDescription}</p>
        </div>
        <div className="col-sm-12 col-md-5 text-end">
          <div className={classes.logoDiv}>
            <Image 
              src='/images/Logo.png'
              height='50px'
              width='50px'
              quality='100'
            />
          </div>
        </div>
      </div>
      <hr style={{ backgroundColor: "#e7a545" }} />
      <div className="text-center">
        <h4 style={{ color: "#e7a545" }}>{t.copyright}</h4>
      </div>
    </div>
  );
};

export default Footer;
