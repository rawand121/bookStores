import Link from "next/link";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { mutate } from "swr";
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

const BooksTable = (props) => {
  const [openedPost, setOpenedPost] = useState();
  const [openModal, setOpenModal] = useState();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("RENDER");
    if (success) {
      toast.success("Product Deleted Successfully");
    }
    if (error) {
      toast.error(error);
    }
  }, [error, success]);

  const deleteBook = async (id) => {
    try {
      mutate(
        "/api/admin/books/",
        props.books.filter((book) => book._id !== id),
        false
      );
      await axios.delete("/api/admin/books/" + id);
      setSuccess(true);
      setError(null);
      setTimeout(() => {
        document.location.reload();
      }, 2000);
    } catch (err) {
      setSuccess(false);
      setError(err.response.data.message);
    }
  };

  return (
    <div className="table-responsive">
      <h2 className="text-center my-4">کـتـێـبـەکـان</h2>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">پێناس</th>
            <th scope="col">ناو</th>
            <th scope="col">ناوی کتێبخانە</th>
            <th scope="col">جۆر</th>
            <th scope="col">نرخ</th>
            <th scope="col">زمان</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {props.books.map((book) => {
            return (
              <tr key={book._id}>
                <th scope="row">{book._id}</th>
                <td>{book.name}</td>
                <td>{book.bookStore}</td>
                <td>{book.category}</td>
                <td>{book.price}</td>
                <td>{book.language}</td>
                <td style={{ display: "flex" }}>
                  <Link href={"/admin/books/update/" + book._id}>
                    <button
                      className="btn bg-warning text-white mx-1"
                      style={{ fontSize: "12px" }}
                    >
                      نوێ کردنەوە
                    </button>
                  </Link>
                  <button
                    className="btn bg-danger text-white mx-1"
                    style={{ fontSize: "12px" }}
                    onClick={() => {
                      setOpenedPost(book);
                      setOpenModal(true);
                    }}
                  >
                    لابردن
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
          <h5 className="mb-5">دڵنیایت کە دەتەوێت کتێبەکە بسڕیتەوە؟</h5>
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
              deleteBook(openedPost._id);
            }}
          >
            سڕینەوە
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BooksTable;
