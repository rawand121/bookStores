import Layout from "../Components/layout/layout";
import UpdatePasswordForm from "../Components/UpdatePasswordForm/Form";
import Footer from "../Components/Footer/footer";
import { getSession } from "next-auth/client";

export default function MyProfile(props) {
  return (
    <Layout title="Update Password">
      <div className="container">
        <div style={{ width: "50%", margin: "0 auto" }}>
          <UpdatePasswordForm />
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
