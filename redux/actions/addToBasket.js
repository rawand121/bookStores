export const addToMyBasket = (book) => {
  const { _id, bookStore, image, name, price } = book;
  let newRes = {
    name,
    price,
    image,
    bookStore,
  };
  newRes["quantity"] = +1;
  newRes["book"] = _id;

  let newCart = localStorage.getItem("basket")
    ? JSON.parse(localStorage.getItem("basket"))
    : [];

  // Bo Check krdn bzanin agar lanaw cartaka habet abet override bkain
  const index = newCart.findIndex((p) => p.book === _id);
  if (index !== -1) {
    newCart[index].quantity = newCart[index].quantity + 1;
  } else {
    newCart.push(newRes);
  }
  localStorage.setItem("basket", JSON.stringify(newCart));
};

// REMOVE
export const deleteFromBasket = (id) => {
  return () => {
    const existLocal = JSON.parse(localStorage.getItem("basket"));
    const updatedLocal = existLocal.filter((prod) => {
      return prod.book !== id;
    });
    localStorage.setItem("basket", JSON.stringify(updatedLocal));
  };
};
