import Head from "next/head";
import Header from "../Header/header";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LoadUser } from "../../redux/actions/index";
import "react-toastify/dist/ReactToastify.css";

const Layout = (props) => {
  const { locale } = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadUser());
  }, []);

  return (
    <div style={props.admin ? { overflow: "hidden" } : {}}>
      <Head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{props.title}</title>

        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-U1DAWAznBHeqEIlVSCgzq+c9gqGAJn5c/t99JyeKa9xxaYpSvHU5awsuZVVFIhvj"
          crossOrigin="anonymous"
        ></script>

        <link
          rel="stylesheet"
          type="text/css"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>
      <Header admin={props.admin} />
      <ToastContainer
        position="bottom-right"
        rtl={locale === "en-US" ? false : true}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {props.children}
    </div>
  );
};

export default Layout;
