import Layout from "../Components/layout/layout";
import BasketForm from "../Components/Basket/basketForm";
import Footer from "../Components/Footer/footer";
import { getSession } from "next-auth/client";

export default function Basket(props) {
  return (
    <Layout title="Basket">
      <div className="container">
        <BasketForm />
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
