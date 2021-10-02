import Navbar from "./navbar";
import Navbar2 from "./navbar2";
import { useRouter } from "next/router";

const Header = (props) => {
  const router = useRouter();
  return (
    <>
      <Navbar admin={props.admin} />
      <hr
        style={
          props.admin
            ? { display: "none" }
            : { height: "2px", margin: "10px 0 " }
        }
      />
      <Navbar2 admin={props.admin} />
      <hr
        style={
          props.admin
            ? { display: "none" }
            : {
                height: "2px",
                margin: router.route === "/" ? "10px 0 0 0" : "10px 0 ",
              }
        }
      />
    </>
  );
};

export default Header;
