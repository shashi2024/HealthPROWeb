import { useParams } from "react-router-dom";
import { useGetPaymentDetailsMutation } from "../../slices/paymentApiSlice";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
} from "react-bootstrap";
import jsPDF from "jspdf";
import logo from "../../images/payment/logo.png"; // Ensure your logo is in the correct path and imported

const ReceiptScreen = () => {
  const { paymentId } = useParams();
  const [getPaymentDetails] = useGetPaymentDetailsMutation();
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const result = await getPaymentDetails(paymentId).unwrap(); // unwrap() to handle the response correctly
        setPayment(result);
      } catch (err) {
        setError("Failed to fetch payment details");
        console.error(err);
      } finally {
        setLoading(false); // Finish loading once the request is completed
      }
    };

    fetchPaymentDetails();
  }, [paymentId, getPaymentDetails]);

  const downloadReceipt = () => {
    if (payment) {
      const doc = new jsPDF();

      // Add the logo to the PDF
      const imgWidth = 70;
      const imgHeight = 20;
      doc.addImage(logo, "PNG", 70, 10, imgWidth, imgHeight); // Adjust the position and size of the logo

      doc.setFont("helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(34, 139, 34);
      doc.text("Payment Receipt", 10, 40);

      // Separate the date and time
      const paymentDate = new Date(payment.createdAt).toLocaleDateString();
      const paymentTime = new Date(payment.createdAt).toLocaleTimeString();

      doc.setFontSize(18);
      doc.text(`Amount: LKR ${payment.amount}`, 10, 50);

      doc.setLineWidth(0.5);
      doc.line(10, 60, 200, 60);

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text("Payment Details", 10, 70);
      doc.text(`Payment Status: ${payment.status}`, 10, 90);

      // Add separate date and time lines
      doc.text(`Payment Date: ${paymentDate}`, 10, 100);
      doc.text(`Payment Time: ${paymentTime}`, 10, 110);

      doc.text(`Total Payment: LKR ${payment.amount}`, 10, 120);

      doc.save(`receipt_${paymentId}.pdf`);
    }
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-3">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-3">
      {payment ? (
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="shadow-sm">
              <Card.Body>
                <div className="text-center mb-2">
                  <img
                    src={logo} // Replace with your logo path
                    alt="Company Logo"
                    width="120"
                    height="40"
                  />
                </div>
                <h3
                  className="text-center mb-2"
                  style={{ fontWeight: "bold", fontFamily: "Kalam" }}
                >
                  Payment Receipt
                </h3>
                <hr />
                <Card.Title className="mb-3">
                  Receipt for Payment ID: {paymentId}
                </Card.Title>
                <Card.Text>
                  <strong>Amount:</strong> LKR {payment.amount}
                </Card.Text>
                <Card.Text>
                  <strong>Status:</strong> {payment.status}
                </Card.Text>
                {/* Separate the date and time in the UI */}
                <Card.Text>
                  <strong>Payment Date:</strong>{" "}
                  {new Date(payment.createdAt).toLocaleDateString()}
                </Card.Text>
                <Card.Text>
                  <strong>Payment Time:</strong>{" "}
                  {new Date(payment.createdAt).toLocaleTimeString()}
                </Card.Text>
                <Button variant="primary" onClick={downloadReceipt}>
                  Download Receipt
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Alert variant="info">No payment details available</Alert>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default ReceiptScreen;
