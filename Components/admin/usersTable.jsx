import axios from "../../AxiosConfig";
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

const UsersTable = ({ users }) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [deleteUserId, setDeleteUser] = useState();

  useEffect(() => {
    if (success) {
      toast.success("بەکارهێنەر سڕدرایەوە");
    }
    if (error) {
      toast.error(error);
    }
  }, [success, error]);

  const deleteUser = async (id) => {
    try {
      await axios.delete("/api/admin/users/" + deleteUserId);
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
      <h2 className="text-center my-5">بەکارهـێـنـەران</h2>
      <table className="table">
        <thead>
          <tr style={{ textAlign: "center" }}>
            <th scope="col">پێناس</th>
            <th scope="col">ناو</th>
            <th scope="col">ئیمەیڵ</th>
            <th scope="col">ژمارەی پەیوەندی</th>
            <th scope="col">فرۆشیارە</th>
            <th scope="col">داواکاریەکانی</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id} style={{ textAlign: "center" }}>
                <th scope="row">{user._id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.seller ? "فرۆشیارە" : "فرۆشیار نیە"}</td>
                <td>{user.orders.length}</td>
                <td>
                  <button
                    className="btn bg-danger text-white"
                    style={{ fontSize: "15px" }}
                    onClick={() => {
                      setOpenModal(true);
                      setDeleteUser(user._id);
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
              deleteUser(deleteUserId);
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
