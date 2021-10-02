import classes from "./details.module.css";
import Image from "next/image";
import { useEffect } from "react";
import Relatedbooks from "./Relatedbooks";
import { addToMyBasket } from "../../redux/actions";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";


const Details = (props) => {
  const {locale} = useRouter()
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src =
      "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v11.0";
    script.defer = true;
    script.nonce = "0DjbdHBP";
    script.crossOrigin = "anonymous";
    document.body.append(script);
  }, []);

  const addBook = () => {
    addToMyBasket(props.book);
  };

  return (
    <>
      <div className="row">
        <div id="fb-root"></div>
        <div className="col-sm-12 col-md-8">
          <h2 className="text-center">{props.book.name}</h2>
          <p className={classes.property + " my-4"}>
            {t.parts} : {props.book.parts}
          </p>
          <p className={classes.property + " my-4"}>
            {t.price} : {props.book.price} IQD
          </p>
          <p className={classes.property + " my-4"}>
            {t.bookstore} : {props.book.bookStore}
          </p>
          <p className={classes.property + " my-4"}>
            {t.language} : {props.book.language}
          </p>
          <p className={classes.property + " my-4"}>
            {t.categorySection} : {props.book.category}
          </p>
          <p className={classes.property + " my-4"}>{props.book.description}</p>
          <button className="btn" style={{ width: "20%" }} onClick={addBook}>
            {t.addtoMybasket}
          </button>
        </div>
        <div className="col-sm-12 col-md-4">
          <Image
            src={props.book.image.url}
            height="300px"
            width="250px"
            quality="100"
            alt="Sinuhe"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-md-8">
          {/* FACEBOOK COMMENTS PLUGIN */}
          <div
            className="fb-comments"
            data-href="http://localhost:3000/books"
            data-width=""
            data-numposts="100"
          ></div>
        </div>

        <div className="col-sm-12 col-md-4">
          <h4 className={"text-center mb-4 " + classes.relatedHeader}>
            {t.relatedBooks}
          </h4>
          <Relatedbooks category={props.book.category} id={props.book._id} />
        </div>
      </div>
    </>
  );
};

export default Details;
