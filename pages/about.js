import Layout from "../Components/layout/layout";
import About from "../Components/About/about";
import Footer from "../Components/Footer/footer";

export default function AboutPage(props) {
  return (
    <Layout title="About">
      <div className="container">
        <About />
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
