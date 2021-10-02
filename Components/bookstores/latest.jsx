import { useEffect, useState } from "react";
import axios from "../../AxiosConfig";
import Spinner from "../../Components/spinner/Spinner";
import useSWR, { mutate } from "swr";
import Modal from "react-modal";
import { toast } from "react-toastify";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    direction: "rtl",
    fontFamily: "Ubuntu Kurdish 0.81 met",
  },
};

Modal.setAppElement("#modalApp");

const LatestOrders = () => {
  const [orders, setOrders] = useState();
  const [Error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [opened, setOpened] = useState(null);
  const [confirmApprove, setConfirmApprove] = useState(false);

  const fetcher = (url) => axios.get(url).then((r) => r.data);

  const { data, error } = useSWR("/api/bookstore/today-orders", fetcher, {
    revalidateOnFocus: true,
  });

  useEffect(() => {
    if (data) {
      setOrders(data);
      setLoading(false);
      setError(null);
    }
    if (error) {
      setError(error.response.data.message);
    }
  }, [data, error, Error]);

  useEffect(() => {
    if (success) {
      toast.success("سـەرکـەوتـوو بـوو.");
    }
    if (Error) {
      toast.error(Error);
    }
  }, [success, Error]);

  if (error) {
    return (
      <div style={{ height: "75vh" }}>
        <h1>{error}</h1>
      </div>
    );
  }

  const bookIsDelivered = async () => {
    try {
      mutate(
        "/api/bookstore/today-orders",
        orders.filter((order) => order._id !== opened._id),
        false
      );

      const { data } = await axios.patch("/api/bookstore/delivered", {
        bookId: opened._id,
      });
      setSuccess(true);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err.response.data.message);
      setSuccess(false);
    }
  };

  if (loading) return <Spinner />;

  return (
    <div>
      <h4 className="text-center my-4">نوێترین داواکاریەکان</h4>
      <table className="table">
        <thead className="bg-primary text-white">
          <tr>
            <th></th>
            <th>ناوی کتێب</th>
            <th>دانە</th>
            <th>نرخی گشتی</th>
            <th>بەکارهێنەر</th>
            <th>ژمارەی بەکارهێنەر</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => {
            return (
              <tr key={order._id}>
                <td>{index + 1} - </td>
                <td>{order.bookDetails[0].name}</td>
                <td>{order.orders[0].qty}</td>
                <td>{order.orders[0].price * order.orders[0].qty} دینار</td>
                <td>{order.userDetails[0].name}</td>
                <td>{order.userDetails[0].phoneNumber}</td>
                <td>
                  <div className="d-flex">
                    <button
                      className="btn mx-1 bg-success text-white"
                      style={{ height: "30px", fontSize: "12px" }}
                      onClick={() => {
                        setOpened(order);
                        setConfirmApprove(true);
                      }}
                    >
                      گەیاندن
                    </button>
                    <button
                      className="btn mx-1 bg-info text-white"
                      style={{ height: "30px", fontSize: "12px" }}
                      onClick={() => {
                        setOpened(order);
                        setIsOpen(true);
                      }}
                    >
                      زیاتر
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/*MODAL FOR MORE INFORMATION ABOUT USED BOOKS */}
      {opened && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div style={{ minWidth: "25rem", maxWidth: "30rem" }}>
            <h3 className="text-center">داواکـاری بـەکـارهـێـنـەر</h3>
            <p className="text-center">
              {opened.userDetails[0].name} / {opened.createdAt.substr(0, 10)}
            </p>
            <p>ناوی کتێب : {opened.bookDetails[0].name}</p>
            <p>ناوی بەکارهێنەر : {opened.userDetails[0].name}</p>
            <p>ئیمەیڵی بەکارهێنەر : {opened.userDetails[0].email}</p>
            <p> جۆر : {opened.bookDetails[0].category}</p>
            <p>
              {" "}
              ناونیشان : {opened.address.street} / {opened.address.address}{" "}
            </p>
            <p> نرخی گشتی : {opened.orders[0].qty * opened.orders[0].price}</p>
          </div>
          <button className="btn bg-danger" onClick={() => setIsOpen(false)}>
            داخـسـتـنـەوە
          </button>
        </Modal>
      )}

      {/* MODAL FOR CONFIRM ARRIVED REQUEST  */}
      <Modal
        isOpen={confirmApprove}
        onRequestClose={() => setConfirmApprove(false)}
        style={customStyles}
        contentLabel="Confirm Modal"
      >
        <div style={{ width: "25rem", textAlign: "center" }}>
          <h5 className="mb-5">دڵنیایت کە داواکاریەکە گەیشتووە؟</h5>
          <button
            className="btn text-white bg-warning  mx-2"
            style={{ width: "40%" }}
            onClick={() => setConfirmApprove(false)}
          >
            نەخێر{" "}
          </button>
          <button
            className="btn text-white bg-success  mx-2"
            style={{ width: "40%" }}
            onClick={() => {
              setConfirmApprove(false);
              bookIsDelivered();
            }}
          >
            بەڵێ
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LatestOrders;
