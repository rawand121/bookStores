import Layout from "../../Components/layout/layout";
import Footer from "../../Components/Footer/footer";
import UsedBooks from "../../Components/usedBooks/books";
import { getUsedBooks } from "../../redux/actions/index";
import { wrapper } from "../../redux/store";

export default function UsedBooksPage(props) {
  return (
    <Layout title="UsedBooks">
      <div className="container">
        <UsedBooks />
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
      await store.dispatch(getUsedBooks(pageNumber, name, writer, category));
    }
);
