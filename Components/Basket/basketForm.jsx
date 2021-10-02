import BasketTable from "./basketTable";
import Link from "next/link";
import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { deleteFromBasket } from "../../redux/actions/index";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";


const BasketForm = () => {
  const [totalPrice, setTotalPrice] = useState();
  const [basket, setBasket] = useState();
  const [update, setUpdate] = useState(false);
  const dispatch = useDispatch();
  const {locale} = useRouter()
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;
  
  useEffect(() => {
    const myBasket = localStorage.getItem("basket")
      ? JSON.parse(localStorage.getItem("basket"))
      : [];
    const totalPrice = myBasket.reduce((a, b) => {
      return a + b.quantity * b.price;
    }, 0);
    setUpdate(false);
    setBasket(myBasket);
    setTotalPrice(totalPrice);
  }, [dispatch, update]);

  const deleteBook = (e, id) => {
    dispatch(deleteFromBasket(id));
    setUpdate(true);
  };
  const changeQuantity = (qty, id) => {
    const existLocal = JSON.parse(localStorage.getItem("basket"));
    const targetedBook = existLocal.findIndex((prod) => prod.book === id);

    if (targetedBook !== -1) {
      existLocal[targetedBook].quantity = qty;
    }

    localStorage.setItem("basket", JSON.stringify(existLocal));
    setUpdate(true);
  };

  if (!basket) {
    return <Spinner />;
  }
  if (basket && basket.length === 0) {
    return (
      <div style={{ height: "75vh" }}>
        <div className="d-flex align-items-center justify-content-around">
          <h1>NOTHING IN YOUR CARD</h1>
          <Image
            src="https://res.cloudinary.com/rawand121/image/upload/v1630614416/BookStore/Empty_Box_bhelab.jpg"
            height="400px"
            width="400px"
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-center my-4">{t.headermyBasket}</h2>
      <BasketTable
        deleteBook={(e, id) => deleteBook(e, id)}
        orders={basket}
        changeQuantity={(q, id) => changeQuantity(q, id)}
      />
      {t.totalPrice} : {totalPrice} {t.iqdTerm}
      <br />
      <br />
      <Link href="/address">
        <a
          className="btn"
          style={{ width: "20%", margin: "0 auto", display: "block" }}
        >
          {t.headerOrders} {totalPrice} {t.iqdTerm}
        </a>
      </Link>
    </>
  );
};

export default BasketForm;
