import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import Link from "next/link";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";


const UserOrders = () => {
  const [orders, setOrders] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const {locale} = useRouter()
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;

  useEffect(() => {
    try {
      const fetchOrders = async () => {
        const { data } = await axios.get("/api/order");
        setOrders(data.orders);
        setLoading(false);
      };
      fetchOrders();
    } catch (err) {
      setLoading(false);
      setError(err.response.data.message);
    }
  }, []);

  if (error) {
    return (
      <div style={{ height: "75vh" }}>
        <h1>{error}</h1>
      </div>
    );
  }
  if (loading) return <Spinner />;
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">{t.idList}</th>
            <th scope="col">{t.bookName}</th>
            <th scope="col">{t.quantity}</th>
            <th scope="col">{t.bookstore}</th>
            <th scope="col">{t.price}</th>
            <th scope="col">{t.date}</th>
          </tr>
        </thead>
        <tbody>
          {/* POPULATE ORDERS  */}
          {orders.map((order) => {
            return (
              <tr key={order._id}>
                <td scope="col">
                  <Link href={`orders/${order._id}`}>{order._id}</Link>
                </td>
                <td scope="col">
                  {order.orders.map((book, index) => (
                    <span key={book._id}>
                      {book.book.name}
                      {order.orders.length - 1 !== index ? " - " : null}{" "}
                    </span>
                  ))}
                </td>
                <td scope="col">
                  {order.orders.map((book, index) => (
                    <span key={book._id}>
                      {book.qty}{" "}
                      {order.orders.length - 1 !== index ? " - " : null}{" "}
                    </span>
                  ))}
                </td>
                <td scope="col">
                  {order.orders.map((book, index) => {
                    return (
                      <span key={book._id}>
                        {book.bookStore.name}{" "}
                        {order.orders.length - 1 !== index ? " - " : null}{" "}
                      </span>
                    );
                  })}
                </td>
                <td scope="col">
                  <span>
                    {order.orders.reduce((a, b) => a + b.qty * b.price, 0)}
                  </span>
                </td>
                <td scope="col">{order.createdAt.substring(0, 10)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserOrders;
