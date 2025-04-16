import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

const DashboardStats = ({ totalPayments, totalAmount }) => {
  const stats = [
    { title: "Total Payments", count: totalPayments },
    { title: "Total Payment Amount", count: `Rs.${totalAmount}` },
    { title: "Doctors", count: 30 },
    { title: "Appointments", count: 150 },
  ];

  return (
    <div className="d-flex justify-content-between">
      {stats.map((stat) => (
        <Card key={stat.title} style={{ width: "18rem", margin: "10px" }}>
          <Card.Body>
            <Card.Title style={{ fontSize: "18px" }}>{stat.title}</Card.Title>
            <Card.Text style={{ fontSize: "20px", fontWeight: "bold" }}>
              {stat.count}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

// Add PropTypes validation for the props
DashboardStats.propTypes = {
  totalPayments: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
};

export default DashboardStats;
