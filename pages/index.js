import Layout from "../Components/layout/layout";
import Header from "../Components/HomeHeader/header";
import Newest from "../Components/Newest/newest";
import Boxes from "../Components/Boxes/boxes";
import Footer from "../Components/Footer/footer";
import { getLatest } from "../redux/actions/index";
import { wrapper } from "../redux/store";

export default function Home() {
  return (
    <Layout title="Home">
      <Header />
      <div className="container">
        <Newest />
        <Boxes />
      </div>
      <Footer />
    </Layout>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getLatest());
  }
);
