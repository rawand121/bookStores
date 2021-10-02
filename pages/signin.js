import Layout from "../Components/layout/layout";
import Signin from "../Components/Signin/sigin";
import Footer from "../Components/Footer/footer";
import { getSession } from "next-auth/client";

export default function Home(props) {
  return (
    <Layout title="Sign In">
      <div className="container">
        <Signin />
      </div>
      <Footer />
    </Layout>
  );
}

export const getServerSideProps = async (ctx) => {
  const session = await getSession({ req: ctx.req });
  if (session) {
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
