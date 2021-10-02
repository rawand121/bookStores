import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import UsedBookForm from "../Components/usedBooks/usedBooksForm";
import Layout from "../Components/layout/layout";
import Footer from "../Components/Footer/footer";
import Spinner from "../Components/spinner/Spinner";
import { getSession } from "next-auth/client";

const Seller = () => {
  const [Error, setError] = useState(null);
  const [Success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Hey Babe");
    if (Success) {
      toast.success("Added Succesfully, please wait for approve your book");
    }
    if (Error) {
      toast.error(Error);
    }
  }, [loading]);

  const submitForm = async (bookData) => {
    setLoading(true);
    try {
      await axios.post("/api/usedBooks", { ...bookData });
      setLoading(false);
      setError(null);
      setSuccess(true);
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
      setSuccess(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Layout title="Seller">
        <div className="container">
          <div style={{ width: "50%", margin: "0 auto" }}>
            <UsedBookForm submitForm={(data) => submitForm(data)} />
          </div>
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanentRedirect: false,
      },
    };
  }
  if (session && session.user.address) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {
      data: null,
    },
  };
};

export default Seller;
