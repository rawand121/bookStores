import Spinner from "../spinner/Spinner";
import classes from "./profile.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";


const ProfileForm = ({ user }) => {
  const {locale} = useRouter()
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;
  if (user === null) return <Spinner />;
  return (
    <>
      <div className="mb-3 d-flex align-items-center">
        <p className={classes.headOfText}>{t.username} : {user.name}</p>
      </div>
      <div className="mb-3 d-flex align-items-center">
        <p className={classes.headOfText}>{t.emailAdress} : {user.email}</p>
      </div>
      <div className="mb-3 d-flex align-items-center">
        <p className={classes.headOfText}>{t.phoneNumber} : {user.phoneNumber}</p>
      </div>
      <div className="mb-3 d-flex align-items-center">
        <p className={classes.headOfText}>{t.headerOrders} : {user.orders.length}</p>
      </div>
      <Link href='/update-password'>
        <button className="btn my-5">{t.clicktoChangepassword}</button>
      </Link>
    </>
  );
};

export default ProfileForm;
