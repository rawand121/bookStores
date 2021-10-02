import Layout from "../../Components/layout/layout";
import Footer from "../../Components/Footer/footer";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import axios from "../../AxiosConfig";
import AdminSidebar from "../../Components/admin/sidebar";
import AdminComponentBoxes from "../../Components/admin/boxes";
import AdminChart from "../../Components/admin/chart";
import Spinner from "../../Components/spinner/Spinner";
import UserBooks from "../../Components/admin/userBooks";
import Link from "next/link";

export default function AdminDashboard(props) {
  const [books, setBooks] = useState();
  const [users, setUsers] = useState();
  const [bookStores, setBookStores] = useState();
  const [numOfAllOrders, setNumOfAllOrders] = useState();
  const [months, setMonths] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    try {
      const { data } = await axios.get("/api/admin");
      // setBookStores(data.bookStores);
      setBooks(data.books);
      setUsers(data.users);
      setMonths(data.months);
      setNumOfAllOrders(data.numOfAllOrders);
      setError(null);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(err.response.data.message);
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
            <AdminComponentBoxes
              users={users}
              books={books}
              numOfAllOrders={numOfAllOrders}
              bookStores={bookStores}
            />
            <AdminChart months={months} />
          </div>
        </div>
        <div className="my-5">
          <UserBooks />
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
