import Layout from "../../Components/layout/layout";
import Footer from "../../Components/Footer/footer";
import Orders from "../../Components/Orders/orders";
import Pagination from "../../Components/Books/pagination";
import { getSession } from "next-auth/client";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";

export default function UserOrders(props) {
  const { locale } = useRouter();
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;
  return (
       <Layout title="Orders">
        <div className="container">
          <h2 className="text-center my-4">{t.headerOrders}</h2>
          <Orders />
          <Pagination />
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
      language: ctx.locale,
    },
  };
};
