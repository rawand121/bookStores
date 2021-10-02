import Link from "next/link";
import classes from "./PlaceSidebar.module.css";

const PlaceSidebar = (props) => {
  return (
    <>
      <div className={classes.sidebar}>
        <ul className={classes.sidenav}>
          <li>
            <Link href="/bookstore">
              <a> داشـبـۆرد</a>
            </Link>
          </li>
          <li>
            <Link href="/bookstore/products">
              <a> بـەرهـەمـەکـان</a>
            </Link>
          </li>
          <li>
            <Link href="/bookstore/add-product">
              <a>زیـاد کـردنـی بـەرهـەم</a>
            </Link>
          </li>
          <li>
            <Link href="/bookstore/orders">
              <a> داواکـاریـیـەکـان</a>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PlaceSidebar;
