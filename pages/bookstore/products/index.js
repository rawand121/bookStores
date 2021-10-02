import Layout from "../../../Components/layout/layout";
import Footer from "../../../Components/Footer/footer";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Spinner from "../../../Components/spinner/Spinner";
import BookStoreSidebar from "../../../Components/bookstores/sidebar";
import Books from "../../../Components/bookstores/books";
import Pagination from "../../../Components/pagination/pagination";
import { useRouter } from "next/router";

export default function BookstoreDashboard(props) {
  const [books, setBooks] = useState();
  const [pages, setPages] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(async () => {
    try {
      const { data } = await axios.get(
        "/api/books?limit=10&page=" + (query.page || 1)
      );
      setBooks(data.books);
      setPages(data.pages);
      setError(null);
      setLoading(false);
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
  }, []);

  if (error) {
    return (
      <div style={{ height: "100%" }}>
        <h1 className="text-center">{error}</h1>
      </div>
    );
  }

  if (loading) return <Spinner />;

  return (
    <Layout title="Books" admin>
      <div className="container" style={{ direction: "rtl" }}>
        <div className="row" style={{ marginBottom: "0px" }}>
          <div className="col-sm-2 right" style={{ paddingRight: "0" }}>
            <BookStoreSidebar />
          </div>
          <div className="col-sm-10 right mt-4">
            <Link href="/">
              <a
                className="btn-flat mb-5 d-block"
                style={{ marginTop: "20px", fontSize: "1.2rem" }}
              >
                پـەیـجـی سـەرەکـی
              </a>
            </Link>
            <Books books={books} />
            <Pagination pages={pages} url={"/bookstore/products"} />
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanentRedirect: false,
      },
    };
  }

  if (session && !session.user.address) {
    return {
      redirect: {
        destination: "/",
        permanentRedirect: false,
      },
    };
  }

  return {
    props: {
      language: ctx.locale,
    },
  };
};
