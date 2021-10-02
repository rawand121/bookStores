import Image from "next/image";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";

const boxes = () => {
  const { locale } = useRouter();
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;

  return (
    <div className="row">
      <h2 className="text-center mb-5 mt-3">{t.whatcanYoudo}</h2>
      <div className="col-xs-12 col-sm-6 col-lg-4 ">
        <div className="card" style={{ width: "18rem" }}>
          <Image
            quality="50"
            src={"/images/Exchange.jpg"}
            height="300px"
            width="400px"
            layout="responsive"
            className="card-img-top"
            alt="Exchange"
          />
          <div className="card-body">
            <h5 className="card-title">{t.exchangeTitle}</h5>
            <p className="card-text">{t.exchangeDescription}</p>
          </div>
        </div>
      </div>
      <div className="col-xs-12 col-sm-6 col-lg-4 ">
        <div className="card" style={{ width: "18rem" }}>
          <Image
            quality="50"
            src={"/images/Seller.jpg"}
            height="300px"
            width="400px"
            layout="responsive"
            className="card-img-top"
            alt="Sell"
          />
          <div className="card-body">
            <h5 className="card-title">{t.sellTitle}</h5>
            <p className="card-text">{t.sellDescription}</p>
          </div>
        </div>
      </div>
      <div className="col-xs-12 col-sm-6 col-lg-4 ">
        <div className="card" style={{ width: "18rem" }}>
          <Image
            quality="50"
            src={"/images/All-Books.jpg"}
            height="300px"
            width="400px"
            layout="responsive"
            className="card-img-top"
            alt="Books"
          />
          <div className="card-body">
            <h5 className="card-title">{t.allBooks}</h5>
            <p className="card-text">{t.booksDescription}</p>
          </div>
        </div>
      </div>
      {/* <div className="col-xs-12 col-sm-6 col-lg-4 ">
        <div className="card" style={{ width: "18rem" }}>
          <Image
            quality="50"
            src={"/images/About.jpg"}
            height="300px"
            width="400px"
            layout="responsive"
            className="card-img-top"
            alt="About"
          />
          <div className="card-body">
            <h5 className="card-title">{t.headerAbout}</h5>
            <p className="card-text">
              You see the books that someone added it to exchange with another
              book, also you can add yours in this page
            </p>
          </div>
        </div> 
      </div> */}
    </div>
  );
};

export default boxes;
