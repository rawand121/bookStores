import axios from "axios";
import { mutate } from "swr";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";

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

const UsersTable = ({ bookstores, items }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [bookStoreId, setBookStore] = useState();

  useEffect(() => {
    if (success) {
      toast.success("بەشداربوو سڕدرایەوە");
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const deleteBookStore = async (id) => {
    try {
      await axios.delete("/api/admin/bookstores/" + id);
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        document.location.reload();
      }, 1500);
    } catch (err) {
      setSuccess(false);
      setError(err.response.data.message);
    }
  };
  return (
    <div className="table-responsive">
      <h2 className="text-center my-5">کـتـێـبـخـانـەکـان</h2>
      <table className="table">
        <caption>{items} دانە</caption>
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th scope="col">پێناس</th>
            <th scope="col">ناو</th>
            <th scope="col">ئیمەیڵ</th>
            <th scope="col">ژمارەی پەیوەندی</th>
            <th scope="col">ژمارەی کتێبەکان</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {bookstores.map((bookstore) => {
            return (
              <tr key={bookstore._id} style={{ textAlign: "center" }}>
                <th scope="row">{bookstore._id}</th>
                <td>{bookstore.name}</td>
                <td>{bookstore.email}</td>
                <td>{bookstore.phoneNumber}</td>
                <td>{bookstore.books.length}</td>
                <td>
                  <button
                    className="btn bg-danger text-white"
                    style={{ fontSize: "15px" }}
                    onClick={() => {
                      setOpenModal(true);
                      setBookStore(bookstore._id);
                    }}
                  >
                    سڕینەوە
                  </button>
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
          <h5 className="mb-5">دڵنیایت کە دەتەوێت بەکارهێنەرەکە بسڕیتەوە؟</h5>
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
              deleteBookStore(bookStoreId);
            }}
          >
            سڕینەوە
          </button>
        </div>
      </Modal>
    </div>
  );
};
export default UsersTable;
