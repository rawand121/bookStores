import Link from "next/link";
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
  const [postToDelete, setPostToDelete] = useState();
  const [error, setError] = useState();
  const [success, setSuccess] = useState();

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
      await axios.delete("/api/bookstore/product/" + id);
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
      <table className="table">
        <thead className="dark-table">
          <tr>
            <th scope="col">ناو</th>
            <th scope="col">کـتـێـبـخـانە</th>
            <th scope="col">نرخ</th>
            <th scope="col">جۆر</th>
            <th scope="col">زمان</th>
            <th scope="col">بەرگ</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {props.books.map((book) => {
            return (
              <tr key={book._id}>
                <td scope="col">{book.name}</td>
                <td scope="col">{book.bookStore.name}</td>
                <td scope="col">{book.price}</td>
                <td scope="col">{book.category}</td>
                <td scope="col">{book.language}</td>
                <td scope="col">{book.parts}</td>
                <td scope="col">
                  <>
                    <Link href={`/bookstore/update/${book._id}`}>
                      <button
                        className="btn btn-warning mx-1"
                        style={{
                          fontSize: "12px",
                          backgroundColor: "#ffc107",
                          color: "#222",
                          width: "50%",
                        }}
                      >
                        نوێ کردنەوە
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger mx-1 text-white"
                      style={{
                        fontSize: "12px",
                        backgroundColor: "#dc3545",
                        width: "30%",
                      }}
                      onClick={() => {
                        setOpenModal(true);
                        setPostToDelete(book._id);
                      }}
                    >
                      سڕینەوە
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
              deleteProduct(postToDelete);
            }}
          >
            سڕینەوە
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Books;
