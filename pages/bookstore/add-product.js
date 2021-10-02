import Layout from "../../Components/layout/layout";
import Footer from "../../Components/Footer/footer";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Spinner from "../../Components/spinner/Spinner";
import BookStoreSidebar from "../../Components/bookstores/sidebar";
import AddProduct from "../../Components/bookstores/add-product";
import { toast } from "react-toastify";

export default function BookstoreDashboard(props) {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("بە سەرکەوتووی زیادکرا");
    }
  }, [error, success]);

  if (error) {
    return (
      <div style={{ height: "100%" }}>
        <h1 className="text-center">{error}</h1>
      </div>
    );
  }

  const createProd = async (infos) => {
    setLoading(true);
    try {
      await axios.post("/api/bookstore/product", infos);
      setSuccess(true);
      setLoading(false);
      setError(null);
    } catch (err) {
      setSuccess(false);
      setError(err.response.data.message);
      setLoading(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <Layout title="Add-Product" admin>
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
            <AddProduct submitForm={(infos) => createProd(infos)} />
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
