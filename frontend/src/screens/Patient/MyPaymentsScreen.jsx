import { useSelector } from "react-redux";
import { useGetPaymentsByPatientMutation } from "../../slices/paymentApiSlice";
import { useEffect } from "react";
import { Table, Container, Row, Col, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa"; // Importing an icon from react-icons

import "../../styles/paymentReceipt.css";

const MyPaymentsScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const patientId = userInfo._id;

  const [getPaymentsByPatientId, { data: payments = [] }] =
    useGetPaymentsByPatientMutation(patientId);

  useEffect(() => {
    getPaymentsByPatientId(patientId);
  }, [getPaymentsByPatientId, patientId]);

  const navigate = useNavigate();

  const handleViewReceipt = (paymentId) => {
    navigate(`/receipt/${paymentId}`);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString(); 
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(); 
  };

  const getStatusStyle = (status) => {
    if (status.toLowerCase() === "pending") {
      return { color: "red", fontWeight: "bold" };
    } else if (status.toLowerCase() === "paid") {
      return { color: "green", fontWeight: "bold" };
    } else {
      return { color: "black" };
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10}>
          <Card className="shadow-sm border-light">
            <Card.Header as="h5" className="bg-primary text-white text-center">
              My Payments
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover responsive className="table-modern">
                <thead>
                  <tr>
                    <th>Amount (LKR)</th>
                    <th>Method</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment._id}>
                      <td>{payment.amount}/=</td>
                      <td>{payment.method}</td>
                      <td>{formatDate(payment.createdAt)}</td>
                      <td>{formatTime(payment.createdAt)}</td>
                      <td style={getStatusStyle(payment.status)}>
                        {payment.status}
                      </td>
                      <td>
                        <Button
                          className="receiptBTN"
                          variant="outline-primary"
                          onClick={() => handleViewReceipt(payment._id)}
                          disabled={payment.status.toLowerCase() === "pending"}
                        >
                          <FaEye className="me-1" /> {/* Adding icon */}
                          View Receipt
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyPaymentsScreen;
