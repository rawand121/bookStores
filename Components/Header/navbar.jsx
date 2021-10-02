import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { signOut } from "next-auth/client";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";


const Header = (props) => {
  const router = useRouter();
  const languages = router.locales;
  const { user } = useSelector((state) => state.Auth);
  const t =
    router.locale === "English" ? English : router.locale === "Kurdish" ? Kurdish : Arabic;

  const logoutUser = () => {
    signOut();
  };

  return (
    <nav
      className="navbar navbar-expand-lg"
      style={props.admin ? { display: "none" } : {}}
    >
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">
            <Image
              src='/images/Logo.png'
              height='50px'
              width= '50px'
              quality='100'
              layout='fixed'
            />
          </a>
        </Link>
        <div className={router.locale ==='English' ? "ms-auto" : "me-auto"}>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
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

export default Header;
