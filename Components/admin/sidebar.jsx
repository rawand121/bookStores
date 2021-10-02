import classes from "./admin.module.css";
import Link from "next/link";

const AdminSidebar = (props) => {
  return (
    <>
      <div className={classes.sidebar} style={{ overflow: "hidden" }}>
        <ul className={classes.sidenav}>
          <li>
            <Link href="/admin">داشـبـۆرد</Link>
          </li>
          <li>
            <Link href="/admin/books">کـتـێـبـەکـان</Link>
          </li>
          <li>
            <Link href="/admin/users">بـەکـارهـێـنـەران</Link>
          </li>
          <li>
            <Link href="/admin/bookstores">بـەشـداربـووان</Link>
          </li>
          <li>
            <Link href="/admin/create-user">زیادکردنی کەس</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminSidebar;
