import ProfileForm from "./ProfileForm";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import English from "../../translate/english";
import Kurdish from "../../translate/kurdish";
import Arabic from "../../translate/arabic";


const Profile = () => {
  const { user, error } = useSelector((state) => state.Auth);
  const {locale} = useRouter()
  const t =
    locale === "English" ? English : locale === "Kurdish" ? Kurdish : Arabic;
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [user]);
  return (
    <div className="my-5">
      <h2 className="text-center">{t.profileHeader}</h2>
      <div className="row my-4">
        <div className="col-sm-12 col-md-6">
          <ProfileForm user={user} />
        </div>
        <div className="col-sm-12 col-md-6 text-center">
          <Image
            src="/images/Pro.jpg"
            height="400"
            width="400"
            quality="100"
            alt="Profile"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
