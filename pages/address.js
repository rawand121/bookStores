import Layout from "../Components/layout/layout";
import Address from "../Components/Address/address";
import Footer from "../Components/Footer/footer";
import { getSession } from "next-auth/client";

export default function Basket(props) {
  return (
    <Layout title="Shipping">
      <div className="container">
        <Address />
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
