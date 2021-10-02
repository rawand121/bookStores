import Layout from "../Components/layout/layout";
import Contact from "../Components/Contact/contact";
import Footer from "../Components/Footer/footer";

export default function ContactUs(props) {
  return (
    <Layout title="Contact">
      <div className="container">
        <Contact />
      </div>
      <Footer />
    </Layout>
  );
}

// export const getServerSideProps = async ({ locale }) => {
//   return {
//     props: {
//       language: locale,
//     },
//   };
// };
