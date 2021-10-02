import Layout from "../../Components/layout/layout";
import Footer from "../../Components/Footer/footer";
import Books from "../../Components/Books/books";
import { getBooks } from "../../redux/actions/index";
import { wrapper } from "../../redux/store";

export default function Home(props) {
  return (
       <Layout title="Books">
        <div className="container">
          <Books />
        </div>
        <Footer />
      </Layout>
   );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query }) => {
      const pageNumber = query.page || 1;
      const name = query.name;
      const writer = query.writer;
      const category = query.category;
      await store.dispatch(getBooks(pageNumber, name, writer, category));
    }
);
