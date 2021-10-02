import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";

const UserDetails = ({ user }) => {
  const {locale} = useRouter()
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;
  return (
    <>
      <h4 className="my-4">
        {t.name} : <span style={{ fontSize: "1.5rem" }}>{user.name}</span>
      </h4>
      <h4 className="my-4">
        {t.emailAdress} : <span style={{ fontSize: "1.5rem" }}>{user.email} </span>
      </h4>
      <h4 className="my-4">
        {t.phoneNumber} :{" "}
        <span style={{ fontSize: "1.5rem" }}>{user.phoneNumber} </span>
      </h4>
    </>
  );
};

export default UserDetails;
