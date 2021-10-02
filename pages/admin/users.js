import Layout from "../../Components/layout/layout";
import Footer from "../../Components/Footer/footer";
import { getSession } from "next-auth/client";
import { useEffect, useState } from "react";
import axios from "../../AxiosConfig";
import AdminSidebar from "../../Components/admin/sidebar";
import Spinner from "../../Components/spinner/Spinner";
import UsersTable from "../../Components/admin/usersTable";
import { useRouter } from "next/router";
import Link from "next/link";
import Pagination from "../../Components/pagination/pagination";

export default function AdminDashboard(props) {
  const [users, setUsers] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { query } = useRouter();

  useEffect(async () => {
    try {
      const { data } = await axios.get(
        `/api/admin/users?page=${query.page || 1}&limit=7`
      );
      setUsers(data);
      setError(null);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  }, [query.page]);

  if (error) {
    return (
      <div style={{ height: "100%" }}>
        <h1 className="text-center">{error}</h1>
      </div>
    );
  }

  if (loading) return <Spinner />;

  return (
    <Layout title="Users" admin>
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
            <UsersTable users={users.users} />
            <Pagination pages={users.pageCount} url="/admin/users" />
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
