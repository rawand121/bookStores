import Layout from "../../Components/layout/layout";
import Footer from "../../Components/Footer/footer";
import Spinner from "../../Components/spinner/Spinner";
import axios from "../../AxiosConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import UserDetails from "../../Components/detailOrder/userDetails";
import OrderDetails from "../../Components/detailOrder/orderedProducts";
import Image from "next/image";
import { getSession } from "next-auth/client";

export default function UserOrders(props) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { orderId } = useRouter().query;

  useEffect(async () => {
    if (orderId) {
      try {
        const { data } = await axios.get(`/api/order/${orderId}`);
        setOrder(data);
        setLoading(false);
        setError(null);
      } catch (err) {
        setOrder(null);
        setLoading(false);
        setError(err.response.data.message);
      }
    }
    return () => {
      setOrder(null);
      setLoading(true);
      setError(null);
    };
  }, [orderId]);

  if (error || (!loading && !order)) {
    return (
      <Layout>
        <h2 className="text-center" style={{ height: "75vh" }}>
          {error}
        </h2>
        <Footer />
      </Layout>
    );
  }
  if (loading) return <Spinner />;

  return (
       <Layout title={"My Order "}>
        <div className="container">
          <h2 className="text-center my-4">Order {order._id}</h2>
          <div className="row">
            <div className="col-sm-12 col-md-7">
              <UserDetails user={order.user} />
              <OrderDetails orders={order.orders} status={order.isDelivered} />
            </div>
            <div className="col-sm-12 col-md-5">
              <Image
                src="https://res.cloudinary.com/rawand121/image/upload/v1630948438/BookStore/5739256_ksjspn.jpg"
                height="500px"
                width="500px"
              />
            </div>
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
      language: ctx.locale,
    },
  };
};
