import Link from "next/link";
import classes from "./header.module.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";


const Navbar2 = (props) => {
  const {locale} = useRouter()
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;

  const { user } = useSelector((state) => state.Auth);
  return (
    <div className="container navbar2 " style={props.admin ? { display: "none" } : {}}>
      <div className="d-flex">
        <ul
          className="d-flex justify-content-center w-100"
          style={{ margin: "0" }}
        >
          <li className={classes.listItemNavbar + " mx-3"}>
            <Link href="/">
              <a className={classes.navLink}>{t.headerHome}</a>
            </Link>
          </li>
          <li className={classes.listItemNavbar + " mx-3"}>
            <Link href="/books">
              <a className={classes.navLink}>{t.allBooks}</a>
            </Link>
          </li>
          {user && !user.address && (
            <>
              <li className={classes.listItemNavbar + " mx-3"}>
                <Link href="/orders">
                  <a className={classes.navLink}>{t.headerMyorders}</a>
                </Link>
              </li>
              <li className={classes.listItemNavbar + " mx-3"}>
                <Link href="/profile">
                  <a className={classes.navLink}>{t.profileHeader}</a>
                </Link>
              </li>
              <li className={classes.listItemNavbar + " mx-3"}>
                <Link href="/seller">
                  <a className={classes.navLink}>{t.headerBeseller}</a>
                </Link>
              </li>
            </>
          )}
          <li className={classes.listItemNavbar + " mx-3"}>
            <Link href="/search">
              <a className={classes.navLink}>{t.headerSearch}</a>
            </Link>
          </li>
          <li className={classes.listItemNavbar + " mx-3"}>
            <Link href="/used-books">
              <a className={classes.navLink}>{t.usedBooks}</a>
            </Link>
          </li>
          <li className={classes.listItemNavbar + " mx-3"}>
            <Link href="/contact-us">
              <a className={classes.navLink}>{t.headerContactus}</a>
            </Link>
          </li>
          <li className={classes.listItemNavbar + " mx-3"}>
            <Link href="/about">
              <a className={classes.navLink}>{t.headerAbout}</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar2;
