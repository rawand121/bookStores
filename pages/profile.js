import Layout from "../Components/layout/layout";
import Profile from "../Components/Profile/profile";
import Footer from "../Components/Footer/footer";
import { getSession } from "next-auth/client";

export default function MyProfile(props) {
  return (
    <Layout title="Profile">
      <div className="container">
        <Profile />
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
      session,
      language: ctx.locale,
    },
  };
};
