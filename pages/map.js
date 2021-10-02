import { getSession } from "next-auth/client";

export default function Basket(props) {
  // const center = {
  //   lat: 35.567566,
  //   lng: 45.408809,
  // };
  // const AnyReactComponent = ({ text }) => <div>{text}</div>;

  return (
    // <Layout title="Shipping">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d12982.534628396845!2d45.42524572383382!3d35.5627487892205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2siq!4v1630693442911!5m2!1sen!2siq"
      width="100%"
      style={{ border: "0", height: "100vh" }}
      allowFullScreen=""
      loading="lazy"
    ></iframe>
    //   <Footer />
    // </Layout>
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
  return {
    props: {
      language: ctx.locale,
    },
  };
};
