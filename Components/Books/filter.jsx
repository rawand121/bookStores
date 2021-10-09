import Kurdish from "../../translate/kurdish";
import English from "../../translate/english";
import Arabic from "../../translate/arabic";
import { useRouter } from "next/router";
import classes from "./filter.module.css";

const Filter = (props) => {
  const router = useRouter();
  const t =
    router.locale === "English"
      ? English
      : router.locale === "Kurdish"
      ? Kurdish
      : Arabic;

  const changeCate = (val) => {
    if (val !== "none") {
      if (router.asPath.includes("?")) {
        if (router.asPath.includes("category")) {
          router.push(router.asPath.replace(/category=\w+/, `category=${val}`));
        } else {
          router.push(router.asPath.concat(`&category=${val}`));
        }
      } else {
        router.push(router.asPath.concat(`?category=${val}`));
      }
    } else {
      router.push(router.asPath.replace(/category=\w+/, ``));
    }
  };

  const changePrice = (enteredDirectionPrice) => {
    if (enteredDirectionPrice !== "none") {
      if (router.asPath.includes("?")) {
        if (router.asPath.includes("price")) {
          router.push(
            router.asPath.replace(/price=.../, `price=${enteredDirectionPrice}`)
          );
        } else {
          router.push(router.asPath.concat(`&price=${enteredDirectionPrice}`));
        }
      } else {
        router.push(router.asPath.concat(`?price=${enteredDirectionPrice}`));
      }
    } else {
      router.push(router.asPath.replace(/price=.../, ``));
    }
  };

  return (
    <div className={"d-flex align-items-center " + classes.filterForm}>
      <div className="inputField" style={{ margin: "0 10px" }}>
        <select
          className="form-select"
          onChange={(e) => changeCate(e.target.value)}
          style={{ width: "100%" }}
          defaultValue={router.query.category ? router.query.category : "none"}
        >
          <option value="none">{t.categorySection}</option>
          <option value="Roman">{t.Roman}</option>
          <option value="Dastan">{t.Dastan}</option>
          <option value="Shi3r">{t.Shi3r}</option>
        </select>
      </div>
      <div className="inputField" style={{ margin: "0 10px" }}>
        <select
          className="form-select"
          onChange={(e) => changePrice(e.target.value)}
          style={{ width: "100%" }}
          defaultValue={router.query.price ? router.query.price : "none"}
        >
          <option value="none">{t.price}</option>
          <option value="asc">{t.asc}</option>
          <option value="des">{t.des}</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
