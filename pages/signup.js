import Layout from "../Components/layout/layout";
import Signup from "../Components/Signup/signup";
import Footer from "../Components/Footer/footer";
import { getSession } from "next-auth/client";

export default function Home(props) {
  return (
    <Layout title="Sign Up">
      <div className="container">
        <Signup />
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
