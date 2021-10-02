import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";

const Orders = (props) => {
  const {locale} = useRouter()
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;

  const deleteBookFromBasket = (e, id) => {
    props.deleteBook(e, id);
  };

  const changedQuantity = (qty, prodId) => {
    props.changeQuantity(qty, prodId);
  };

  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">{t.bookName}</th>
            <th scope="col">{t.quantity}</th>
            <th scope="col">{t.bookstore}</th>
            <th scope="col">{t.price}</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {props.orders.map((order) => {
            return (
              <tr key={order.book}>
                <td scope="col">{order.name}</td>
                <td scope="col">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    defaultValue={order.quantity}
                    onChange={(e) =>
                      changedQuantity(e.target.value, order.book)
                    }
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="3">4</option>
                    <option value="3">5</option>
                  </select>
                </td>
                <td scope="col">{order.bookStore}</td>
                <td scope="col">{order.price}</td>
                <td scope="col">
                  <button
                    onClick={(e) => deleteBookFromBasket(e, order.book)}
                    className="btn w-50 d-block mx-auto"
                  >
                    {t.deleteButton}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
