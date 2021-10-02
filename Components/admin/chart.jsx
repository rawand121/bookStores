import React from "react";
import { Line } from "react-chartjs-2";

const AdminChart = (props) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Line
        data={{
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          datasets: [
            {
              label: "NUMBER OF ORDERS BY USERS ",
              backgroundColor: "rgb(231,165,69)",
              borderColor: "rgb(230,160,70)",
              data: props.months,
            },
          ],
        }}
        height={70}
        width={200}
        options={{
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default AdminChart;
