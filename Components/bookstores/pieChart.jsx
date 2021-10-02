import { Pie } from "react-chartjs-2";

const BookStore = ({ categories }) => {
  console.log(categories);
  return (
    <div style={{ height: "20%", width: "77%", margin: "0 auto" }}>
      <h6 className="text-center mb-3">
        زۆرترین داواکاری کتێبەکانت (بەپێی جۆرەکان)
      </h6>
      <Pie
        data={{
          labels: [
            categories.first._id,
            categories.second._id,
            categories.third._id,
            "Others",
          ],
          datasets: [
            {
              data: [
                categories.first.count,
                categories.second.count,
                categories.third.count,
                categories.others,
              ],
              backgroundColor: ["#ffb63e", "#61cde9", "#9bd093", "#328be0"],
              hoverOffset: 4,
            },
          ],
        }}
      />
    </div>
  );
};

export default BookStore;
