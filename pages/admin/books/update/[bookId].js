import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "../../../../AxiosConfig";
import { getSession } from "next-auth/client";
import Link from "next/link";

import Layout from "../../../../Components/layout/layout";
import Footer from "../../../../Components/Footer/footer";
import AdminSidebar from "../../../../Components/admin/sidebar";
import Spinner from "../../../../Components/spinner/Spinner";
import UpdateForm from "../../../../Components/admin/updateForm";

export default function AdminDashboard(props) {
  const [book, setBook] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { query } = useRouter();

  useEffect(async () => {
    try {
      const { data } = await axios.get(`/api/books/${query.bookId}`);
      setBook(data);
      setError(null);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  }, [query]);

  if (error) {
    return (
      <div style={{ height: "100%" }}>
        <h1 className="text-center">{error}</h1>
      </div>
    );
  }

  if (loading) return <Spinner />;

  return (
    <Layout title="Dashboard" admin>
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
            {/* COMPONENT */}
            <UpdateForm book={book} />
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
