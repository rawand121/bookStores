import Layout from "../Components/layout/layout";
import Search from "../Components/Search/search";
import Footer from "../Components/Footer/footer";

export default function Home(props) {
  return (
    <Layout title="Search">
      <div className="container">
        <Search />
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
