import Layout from "../../Components/layout/layout";
import Footer from "../../Components/Footer/footer";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import axios from "../../AxiosConfig";
import AdminSidebar from "../../Components/admin/sidebar";
import BookstoresTable from "../../Components/admin/bookstoresTable";
import Pagination from "../../Components/pagination/pagination";
import Spinner from "../../Components/spinner/Spinner";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BookStoresPage(props) {
  const [bookStores, setBookStores] = useState();
  const [pages, setPages] = useState();
  const [items, setItems] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { query } = useRouter();

  useEffect(async () => {
    try {
      const { data } = await axios.get(
        `/api/admin/bookstores?limit=10&page=${query.page || 1}`
      );
      setBookStores(data.bookStores);
      setPages(data.pageCount);
      setItems(data.itemCount);
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
    <Layout title="BookStores" admin>
      <div className="container" style={{ direction: "rtl" }}>
        <div className="row" style={{ marginBottom: "0px" }}>
          <div className="col-sm-2 right" style={{ paddingRight: "0" }}>
            <AdminSidebar />
          </div>
          <div className="col-sm-10 right mt-4">
            <Link href="/">
              <a
                className="btn-flat"
                style={{ marginTop: "20px", fontSize: "1.2rem" }}
              >
                پـەیـجـی سـەرەکـی
              </a>
            </Link>
            <BookstoresTable bookstores={bookStores} items={items} />
            <Pagination
              pages={pages}
              url={"http://localhost:3000/admin/bookstores"}
            />
          </div>
        </div>
      </div>
      <Footer />
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });
  if (!session || !session.user.isAdmin) {
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
