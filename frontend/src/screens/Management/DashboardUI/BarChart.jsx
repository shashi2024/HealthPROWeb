import { Bar } from "react-chartjs-2";
import PropTypes from "prop-types"; // Import prop-types for validation
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({ totalPayments }) => {
  const data = {
    labels: ["Patients", "Doctors", "Appointments", "Payments"],
    datasets: [
      {
        label: "Count",
        data: [500, 30, 150, totalPayments],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Admin Overview Data",
      },
    },
  };

  return <Bar data={data} options={options} />;
};

// PropTypes validation
BarChart.propTypes = {
  totalPayments: PropTypes.number.isRequired, // Ensure totalPayments is passed and is a number
};

export default BarChart;
