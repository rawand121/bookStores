import { MDBDataTable } from "mdbreact";
import Modal from "react-modal";
import { useEffect, useState } from "react";
import axios from "../../AxiosConfig";
import { toast } from "react-toastify";
import useSwr, { mutate } from "swr";

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

const UserBooks = (props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [opened, setOpened] = useState(null);
  const [books, setBooks] = useState();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [confirmApprove, setConfirmApprove] = useState(false);
  const [success, setSuccess] = useState(null);
  const [Error, setError] = useState(null);

  const fetcher = (url) =>
    axios.get(url, { headers: { notApproved: true } }).then((res) => res.data);

  // const { data, error } = useSWR(
  //   [`http://localhost:8000/api/v1/users/get-avatar`, auth.token],
  //   fetcher
  // );

  const { data, error } = useSwr("/api/usedBooks/admin", fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (Error) {
      console.log("Error");
      toast.error(Error);
      setError(null);
    }
    if (success) {
      console.log("Success");
      toast.success(success);
      setSuccess(null);
    }
    if (data) {
      console.log("data", data);
      setBooks(data);
      setError(null);
    }
    if (error) {
      console.log("error");
      console.log(error);
      setBooks();
      setError(error);
    }
  }, [data, Error, success]);

  function closeModal() {
    setIsOpen(false);
  }

  const deleteUsedBookRequest = async (id) => {
    try {
      mutate(
        "/api/usedBooks",
        books.filter((book) => book._id !== id),
        false
      );
      const { data } = await axios.delete(`/api/usedBooks/${id}`);
      setSuccess(data.Message);
      setError(null);
    } catch (err) {
      console.log(err);
      setError(err);
      setSuccess(null);
    }
  };

  const approveBook = async (id) => {
    try {
      mutate(
        "/api/usedBooks",
        books.filter((book) => book._id !== id),
        false
      );
      const { data } = await axios.patch(`/api/usedBooks/${id}`);

      // trigger("/api/usedBooks");
      setSuccess(data.Message);
      setError(null);
    } catch (err) {
      setSuccess(null);
      setError(err.response.data.message);
    }
  };

  const setDataTable = () => {
    const tableData = {
      columns: [
        {
          field: "username",
          label: "???????? ??????",
          width: 100,
        },
        {
          field: "id",
          label: "????????????",
          width: 50,
        },
        {
          field: "phone",
          label: "???????????? ????????????????",
        },
        {
          field: "name",
          label: "???????? ????????",
        },
        {
          field: "type",
          label: "???????? ????????????",
        },
        {
          field: "price",
          label: "??????",
        },
        {
          field: "address",
          label: "????????????????",
        },
        {
          field: "action",
          label: "??????????",
        },
      ],
      rows: [],
    };
    books &&
      books.forEach((book) => {
        tableData.rows.push({
          posts: book.name,
          username: book.author.name,
          id: book.author.email,
          phone: book.author.phoneNumber,
          name: book.name,

          address: book.address,
          type: book.typeOfTransaction === "sell" ? "????????????" : "????????????????",
          price: book.typeOfTransaction === "sell" ? book.price : "0",
          action: (
            <>
              <button
                className="btn mx-1 bg-warning text-black"
                style={{ width: "70px", fontSize: "12px" }}
                onClick={() => {
                  setOpened(book);
                  setIsOpen(true);
                }}
              >
                ????????????????
              </button>
              <button
                className="btn mx-1 bg-success "
                style={{ width: "70px", color: "white", fontSize: "12px" }}
                onClick={() => {
                  setOpened(book);
                  setConfirmApprove(true);
                }}
              >
                ????????????????
              </button>
              <button
                className="btn mx-1 bg-danger "
                style={{ width: "70px", color: "white", fontSize: "12px" }}
                onClick={() => {
                  setConfirmDelete(true);
                  setOpened(book);
                }}
              >
                ??????????????
              </button>
            </>
          ),
        });
      });
    return tableData;
  };

  return (
    <>
      <h1 className="text-center mb-5">???????????????? ???????????????????????? ???? ???????????? ????????</h1>
      <MDBDataTable data={setDataTable()} hover striped />

      {/*MODAL FOR MORE INFORMATION ABOUT USED BOOKS */}
      <div>
        {opened && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div style={{ minWidth: "25rem", maxWidth: "30rem" }}>
              <h3 className="text-center">?????????????????? ??????????????????????????????</h3>
              <p className="text-center">
                {opened.author.name} / 20/2/2021
                {/* {opened.createdAt.substr(0, 10)} */}
              </p>
              <p>???????? ???????? : {opened.name}</p>
              <p>???????? ???????????????????? : {opened.author.name}</p>
              <p>?????????????? ???????????????????? : {opened.author.email}</p>
              <p>
                ???????? ???????????? :
                {opened.typeOfTransaction === "sell" ? "????????????" : "????????????????"}
              </p>
              <p> ??.???????? : {opened.parts} ????????</p>
              <p> ?????? : {opened.category}</p>
              <p> ???????????????? : {opened.address}</p>
              <p> ?????????? : {opened.description}</p>
            </div>
            <button className="btn bg-danger text-white" onClick={closeModal}>
              ??????????????????????????
            </button>
          </Modal>
        )}

        {/* MODAL FOR CONFIRM DELETE  */}
        <Modal
          isOpen={confirmDelete}
          onRequestClose={() => setConfirmDelete(false)}
          style={customStyles}
          contentLabel="Confirm Modal"
        >
          <div style={{ width: "25rem", textAlign: "center" }}>
            <h5 className="mb-5">?????????????? ???? ?????????????? ?????????????????????? ??????????????????</h5>
            <button
              className="btn text-black bg-warning  mx-2"
              style={{ width: "40%" }}
              onClick={() => setConfirmDelete(false)}
            >
              ?????????????? ??????????????
            </button>
            <button
              className="btn text-white bg-danger  mx-2"
              style={{ width: "40%" }}
              onClick={() => {
                setConfirmDelete(false);
                deleteUsedBookRequest(opened._id);
              }}
            >
              ??????????????
            </button>
          </div>
        </Modal>

        {/* MODAL FOR CONFIRM APPROVE POST  */}
        <Modal
          isOpen={confirmApprove}
          onRequestClose={() => setConfirmApprove(false)}
          style={customStyles}
          contentLabel="Confirm Modal"
        >
          <div style={{ width: "25rem", textAlign: "center" }}>
            <h5 className="mb-5">?????????????? ???? ?????????????? ?????????????????????? ??????????????????</h5>
            <button
              className="btn text-black bg-warning  mx-2"
              style={{ width: "40%" }}
              onClick={() => setConfirmApprove(false)}
            >
              ?????????????? ??????????????
            </button>
            <button
              className="btn text-white bg-success  mx-2"
              style={{ width: "40%" }}
              onClick={() => {
                setConfirmApprove(false);
                approveBook(opened._id);
              }}
            >
              ??????????????
            </button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default UserBooks;
