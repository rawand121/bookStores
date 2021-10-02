import AddressForm from "./addressForm";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";


const AddressAndLocation = () => {
  const {locale} = useRouter()
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;
  return (
    <>
      <h2 className="text-center my-4">{t.myAdress}</h2>
      <AddressForm />
    </>
  );
};

export default AddressAndLocation;
