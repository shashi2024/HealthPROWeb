import PropTypes from "prop-types";
import { Button, Col, Container, Row, Table } from "react-bootstrap";
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar";
import "../../styles/Payments.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Payments.css";
import jsPDF from "jspdf";

const Payments = ({ setTotalPayments, setTotalAmount }) => {
  const [payments, setPayments] = useState([]);

  // Fetch payments from the API
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/payments/getallpayments"
        );
        setPayments(response.data);

        // Calculate total payments and total amount
        const totalPayments = response.data.length;
        const totalAmount = response.data.reduce(
          (sum, payment) => sum + payment.amount,
          0
        );

        // Pass the totals to parent component via props
        setTotalPayments(totalPayments);
        setTotalAmount(totalAmount);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, [setTotalPayments, setTotalAmount]);

  const navigate = useNavigate();

  const handleUpdate = (paymentId) => {
    navigate(`/managementdashboard/payments/updatepayments/${paymentId}`);
  };

  const handleDelete = async (paymentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this payment?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/payments/deletepayment/${paymentId}`
      );
      setPayments((prevPayments) =>
        prevPayments.filter((payment) => payment._id !== paymentId)
      );
    } catch (error) {
      console.error("Error deleting payment:", error);
    }
  };

  // PDF generator function
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Payments Report", 14, 15);
    doc.setFontSize(12);
    let y = 30;
    doc.text("#", 14, y);
    doc.text("ID", 24, y);
    doc.text("Amount", 90, y);
    doc.text("Method", 120, y);
    doc.text("Status", 140, y);
    y += 8;
    payments.forEach((payment, idx) => {
      doc.text(String(idx + 1), 14, y);
      doc.text(String(payment.user), 24, y);
      doc.text(String(payment.amount), 90, y);
      doc.text(String(payment.method), 120, y);
      doc.text(String(payment.status), 134, y);
      y += 8;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save("Payments_Report.pdf");
  };

  return (
    <Container fluid className="AdminDashboard">
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar />
        </Col>
        <Col md={9}>
          <div className="patient_list">
            <h2>All Payments</h2>
            <Button
              variant="info"
              style={{ marginBottom: '16px', fontWeight: 'bold', color: '#fff' }}
              onClick={generatePDF}
            >
              Download Payments Report (PDF)
            </Button>
            <Table striped bordered hover responsive="sm" className="mt-4 form">
              <thead>
                <tr>
                  <th>#</th>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment._id}>
                    <td>{index + 1}</td>
                    <td>{payment.user}</td>
                    <td>{payment.amount}</td>
                    <td>{payment.method}</td>
                    <td>{payment.status}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleUpdate(payment._id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(payment._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

// Add PropTypes validation for the props
Payments.propTypes = {
  setTotalPayments: PropTypes.func.isRequired,
  setTotalAmount: PropTypes.func.isRequired,
};

export default Payments;
