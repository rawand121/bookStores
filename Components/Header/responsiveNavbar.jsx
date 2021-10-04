import { useRouter } from "next/router";
import kurdishTranslate from "../../translate/kurdish";
import EnglishTranslate from "../../translate/english";
import ArabicTranslate from "../../translate/arabic";
import { useSelector } from "react-redux";
import { signOut } from "next-auth/client";
import classes from "./header.module.css";

import Link from "next/link";

const responsiveNavbar = () => {
  const router = useRouter();
  const { user } = useSelector((state) => state.Auth);
  const languages = router.locales;

  const t =
    router.locale === "English"
      ? EnglishTranslate
      : router.locale === "Kurdish"
      ? kurdishTranslate
      : ArabicTranslate;
  const logoutUser = () => {
    signOut();
  };

  return (
    <nav className="navbar navbar-light bg-transparent mt-3  NavbarMob">
      <div className="container-fluid">
        <button
          className={`${
            router.locale === "English" ? "ms-auto" : "me-auto"
          } d-block navbar-toggler`}
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-body">
            <ul className="navbar-nav">
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
              <hr style={{ height: "2px", backgroundColor: "#333" }} />
              {!user ? (
                <>
                  <li className="nav-item">
                    <Link href="/signin">
                      <a className="nav-link active" aria-current="page">
                        {t.headerSignin}
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/signup">
                      <a className="nav-link active" aria-current="page">
                        {t.headerSignup}
                      </a>
                    </Link>
                  </li>
                </>
              ) : user.address ? (
                <>
                  <li className="nav-item">
                    <Link href="/bookstore">
                      <a className="nav-link active" aria-current="page">
                        {t.dashboard}
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      onClick={logoutUser}
                      style={{ cursor: "pointer" }}
                    >
                      {t.headerLogout}
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link href="/basket">
                      <a className="nav-link active" aria-current="page">
                        {t.headermyBasket}
                      </a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      aria-current="page"
                      onClick={logoutUser}
                      style={{ cursor: "pointer" }}
                    >
                      {t.headerLogout}
                    </a>
                  </li>
                </>
              )}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {t.headerLanguages}
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  {languages.map((lang) => (
                    <li key={lang}>
                      <Link href={router.asPath} locale={lang}>
                        <a className="dropdown-item">{lang}</a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default responsiveNavbar;
