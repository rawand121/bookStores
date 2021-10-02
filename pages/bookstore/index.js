import Layout from "../../Components/layout/layout";
import Footer from "../../Components/Footer/footer";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import axios from "../../AxiosConfig";
import Link from "next/link";
import Spinner from "../../Components/spinner/Spinner";
import BookStoreSidebar from "../../Components/bookstores/sidebar";
import BookStoreLineChart from "../../Components/bookstores/chart";
import BookStorePieChart from "../../Components/bookstores/pieChart";
import BookStoreBoxes from "../../Components/bookstores/boxes";
import LatestOrders from "../../Components/bookstores/latest";

export default function BookstoreDashboard(props) {
  const [sortByCategories, setSortByCategories] = useState();
  const [numOfAllOrders, setNumOfAllOrders] = useState();
  const [totalBooks, setTotalBooks] = useState();
  const [totalMoney, setTotalMoney] = useState();
  const [months, setMonths] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    try {
      const { data } = await axios.get("/api/bookstore");
      setTotalBooks(data.totalBooks);
      setSortByCategories(data.sortCategories);
      setTotalMoney(data.totalMoney);
      setMonths(data.months);
      setNumOfAllOrders(data.allOrders);
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
    <Layout title="Dashboard" admin>
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
            <BookStoreBoxes
              allOrders={numOfAllOrders}
              allBooks={totalBooks}
              totalMoney={totalMoney}
            />
            <BookStoreLineChart months={months} />
          </div>
        </div>
        <div className="row text-center mt-5 ">
          <div
            className="col-sm-5 bg-light py-3"
            style={{ borderRadius: "10px" }}
          >
            <BookStorePieChart categories={sortByCategories} />
          </div>
          <div
            className="col-sm-7 bg-light py-3"
            style={{ borderRadius: "10px" }}
          >
            <LatestOrders />
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
