import Link from "next/link";

const Boxes = (props) => {
  return (
    <div>
      <div className="row justify-content-around">
        <div className="col-sm-3 bg-dark" style={{ borderRadius: "8px" }}>
          <h3 className="text-center p-3 text-white ">ژمارەی داواکاریەکان</h3>
          <hr style={{ height: "1px", backgroundColor: "white" }} />
          <div className="d-flex align-items-center justify-content-between py-3 px-2">
            <h5 className=" text-warning">{props.allOrders} داواکاری</h5>
            <Link href="/bookstore/products">
              <span
                className="text-warning "
                style={{ cursor: "pointer", fontSize: "11px" }}
              >
                بڕۆ بۆ بەشی داواکاریەکان
              </span>
            </Link>
          </div>
        </div>
        <div className="col-sm-3 bg-dark" style={{ borderRadius: "8px" }}>
          <h3 className="text-center p-3 text-white"> ژمارەی کتێبەکان</h3>
          <hr style={{ height: "1px", backgroundColor: "white" }} />
          <div className="d-flex align-items-center justify-content-between py-3 px-2">
            <h5 className=" text-warning">{props.allBooks} کتێب</h5>
            <Link href="/bookstore/products">
              <span
                className="text-warning "
                style={{ cursor: "pointer", fontSize: "11px" }}
              >
                کتێبی نوێ زیاد بکە
              </span>
            </Link>
          </div>
        </div>
        <div className="col-sm-3 bg-dark" style={{ borderRadius: "8px" }}>
          <h3 className="text-center p-3 text-white">قازانجی گشتی</h3>
          <hr style={{ height: "1px", backgroundColor: "white" }} />
          <h5 className="text-warning text-center">{props.totalMoney} دینار</h5>
        </div>
      </div>
    </div>
  );
};

export default Boxes;
