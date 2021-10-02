import Image from "next/image";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";

const UserDetails = (props) => {
  const {locale} = useRouter()
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;
  return (
    <>
      <hr />
      <h4 className="my-5">
        STATUS :
        {!props.status ? (
          <span className="text-danger ms-1" style={{ fontSize: "1.5rem" }}>
            Not Delivered
          </span>
        ) : (
          <span className="text-success ms-1" style={{ fontSize: "1.5rem" }}>
            Delivered
          </span>
        )}
      </h4>
      <hr />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">{t.image}</th>
            <th scope="col">{t.bookName}</th>
            <th scope="col">{t.bookStore}</th>
            <th scope="col">{t.quantity}</th>
            <th scope="col">{t.price}</th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order) => {
            return (
              <tr key={order.book._id}>
                <td>
                  <Image
                    src={order.book.image.url}
                    height="50px"
                    width="50px"
                    alt={order.book.name}
                  />
                </td>
                <td>{order.book.name}</td>
                <td>{order.book.bookStore}</td>
                <td>{order.qty}</td>
                <td>{order.price} {t.iqdTerm}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h5 className="text-center">
        {t.totalPrice} {props.orders.reduce((a, b) => a + b.price * b.qty, 0)}{" "}
        {t.iqdTerm}
      </h5>
    </>
  );
};

export default UserDetails;
