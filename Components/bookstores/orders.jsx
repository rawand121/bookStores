 import { useState, useEffect } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import axios from "../../AxiosConfig";
 
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

const Books = (props) => {
  const [openModal, setOpenModal] = useState();
  const [order, setOrder] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [openOrderModal, setOpenOrderModal] = useState();

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("سەرکەوتو بوو..");
    }
  }, [error, success]);

  const deleteProduct = async (id) => {
    try {
      await axios.delete("/api/bookstore/orders/" + id);
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        document.location.reload();
      }, 1500);
    } catch (err) {
      console.log(err);
      setSuccess(false);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table">
        <thead className="dark-table">
          <tr>
            <th scope="col">ناو</th>
            <th scope="col">دانە</th>
            <th scope="col">نرخ</th>
            <th scope="col">ناوی کەس</th>
            <th scope="col">ژمارە</th>
            <th scope="col">بەروار</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order) => {
            if (order !== null)
              return (
                <tr>
                  <td scope="col">
                    {order.bookDetails.map(
                      (book, index) =>
                        book.name +
                        (index !== order.bookDetails.length - 1 ? " - " : "")
                    )}
                  </td>
                  <td scope="col">
                    {order.myOrders.map(
                      (orderQty, index) =>
                        orderQty.qty +
                        (index !== order.myOrders.length - 1 && " - ")
                    )}
                  </td>
                  <td scope="col">
                    {order.myOrders.reduce((a, b) => a + b.price * b.qty, 0)}
                  </td>
                  <td scope="col">{order.userDetails[0].name}</td>
                  <td scope="col">{order.userDetails[0].phoneNumber}</td>
                  <td scope="col">{order.createdAt.substring(0, 10)}</td>
                  <td scope="col">
                    <>
                      <button
                        className="btn btn-danger mx-1 text-white"
                        style={{
                          fontSize: "12px",
                          backgroundColor: "#dc3545",
                          width: "50%",
                        }}
                        onClick={() => {
                          setOpenModal(true);
                          setOrder(order._id);
                        }}
                      >
                        سڕینەوە
                      </button>
                      <button
                        className="btn btn-warning mx-1  "
                        style={{
                          fontSize: "12px",
                          backgroundColor: "#ffc107",
                          color: "#222",
                          width: "30%",
                        }}
                        onClick={() => {
                          setOrder(order);
                          setOpenOrderModal(true);
                        }}
                      >
                        زیاتر
                      </button>
                    </>
                  </td>
                </tr>
              );
          })}
        </tbody>
      </table>

      <Modal
        isOpen={openModal}
        onRequestClose={() => setOpenModal(false)}
        style={customStyles}
        contentLabel="Confirm Modal"
      >
        <div style={{ width: "25rem", textAlign: "center" }}>
          <h5 className="mb-5">دڵنیایت کە دەتەوێت بەرهەمەکە بسڕیتەوە؟</h5>
          <button
            className="btn text-white bg-warning  mx-2"
            style={{ width: "40%" }}
            onClick={() => setOpenModal(false)}
          >
            پەشیمان بوونەوە
          </button>
          <button
            className="btn text-white bg-danger  mx-2"
            style={{ width: "40%" }}
            onClick={() => {
              setOpenModal(false);
              deleteProduct(order);
            }}
          >
            سڕینەوە
          </button>
        </div>
      </Modal>
      {order && (
        <Modal
          isOpen={openOrderModal}
          onRequestClose={() => setOpenOrderModal(false)}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div
            style={{ minWidth: "30rem", maxWidth: "30rem", minHeight: "25rem" }}
          >
            <h3 className="text-center">داواکـاری بـەکـارهـێـنـەر</h3>
            <p className="text-center">
              {order.userDetails[0].name} / {order.createdAt.substring(0, 10)}
              {/* {order.createdAt.substr(0, 10)} */}
            </p>
            <p>
              ناوی کتێب :{" "}
              <span className="text-primary">
                {order.bookDetails.map(
                  (book, index) =>
                    book.name +
                    (index !== order.bookDetails.length - 1 ? " - " : " ")
                )}
              </span>
            </p>
            <p>
              ژمارەی بەکارهێنەر :{" "}
              <span className="text-primary">
                {order.userDetails[0].phoneNumber}
              </span>
            </p>
            <p>
              ئیمەیڵی بەکارهێنەر :{" "}
              <span className="text-primary">{order.userDetails[0].email}</span>
            </p>
            <p>
              جۆر :
              <span className="text-primary">
                {order.bookDetails.map(
                  (book, index) =>
                    book.category +
                    (index !== order.bookDetails.length - 1 ? " - " : " ")
                )}
              </span>
            </p>
            <p>
              ناونیشان :{" "}
              <span className="text-primary">
                {order.address.street + " - " + order.address.address}
              </span>
            </p>
            <p>
              گەیاندن :{" "}
              {order.isDelivered ? (
                <span className="text-success"> گـەیـشـتـووە </span>
              ) : (
                <span className="text-danger"> نـەگـەیـشـتـووە </span>
              )}
            </p>
            <p>
              {" "}
              پەیام : <span className="text-primary">{order.Note}</span>
            </p>
          </div>
          <button
            className="btn bg-danger text-white"
            onClick={() => setOpenOrderModal(false)}
          >
            داخـسـتـنـەوە
          </button>
        </Modal>
      )}
    </div>
  );
};

export default Books;
