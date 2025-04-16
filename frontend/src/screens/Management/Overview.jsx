import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar";
import BarChart from "../Management/DashboardUI/BarChart";
import DashboardStats from "../Management/DashboardUI/DashboardStats";
import axios from "axios";

import "../../styles/Overview.css";

const Overview = () => {
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  // Fetch payment data
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/payments/getallpayments"
        );

        const payments = response.data;

        // Calculate totals
        setTotalPayments(payments.length);
        setTotalAmount(
          payments.reduce((sum, payment) => sum + payment.amount, 0)
        );
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  return (
    <Container fluid className="AdminDashboard">
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar />
        </Col>
        <Col md={9}>
          <div className="dashboard_overview">
            <h2>HealthNet Overview</h2>

            <DashboardStats
              totalPayments={totalPayments}
              totalAmount={totalAmount}
            />

            {/* Pass the dynamic payment count to the BarChart */}
            <BarChart totalPayments={totalPayments} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Overview;
