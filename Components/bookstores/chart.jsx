import { Line } from "react-chartjs-2";

const Chart = (props) => {
  return (
    <div style={{ width: "100%", marginTop: "50px" }}>
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
              label: "ژمارەی داواکاریەکان بەپێی مانگەکانی ساڵ ",
              backgroundColor: "#ffc107",
              borderColor: "#212529",
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

export default Chart;
