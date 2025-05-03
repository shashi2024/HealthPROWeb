import { useLocation } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import "../styles/Appointments.css"; // Fixed import path

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: 'grey',
  },
});

// PDF Document Component
const PaymentPDF = ({ paymentDetails }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>Payment Pending Approval</Text>
      
      <View style={styles.section}>
        <Text style={styles.title}>Payment Details</Text>
        {paymentDetails.doctor && (
          <Text style={styles.text}>Doctor: {paymentDetails.doctor}</Text>
        )}
        <Text style={styles.text}>Payment Method: {paymentDetails.method}</Text>
        <Text style={styles.text}>Amount: Rs.{paymentDetails.amount}</Text>
        <Text style={styles.text}>Status: Pending Approval</Text>
        <Text style={styles.text}>Date: {new Date().toLocaleDateString()}</Text>
        {paymentDetails.appointmentId && (
          <Text style={styles.text}>Appointment ID: {paymentDetails.appointmentId}</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Important Information</Text>
        <Text style={styles.text}>• Your payment is currently under review</Text>
        <Text style={styles.text}>• You will be notified once your payment has been processed</Text>
        <Text style={styles.text}>• Please keep this receipt for your records</Text>
      </View>

      <Text style={styles.footer}>
        This is a computer-generated document. No signature is required.
      </Text>
    </Page>
  </Document>
);

const PendingApprovalScreen = () => {
  const location = useLocation();
  const { paymentDetails } = location.state || {};

  return (
    <Container fluid className="AdminDashboard">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="form-container p-4 mt-4">
            <h1 className="text-center mb-4">Payment Pending Approval</h1>
            
            {paymentDetails ? (
              <Card className="shadow-sm">
                <Card.Body>
                  <div className="text-center mb-4">
                    <i className="fas fa-clock fa-3x text-warning mb-3"></i>
                    <h4>Payment Under Review</h4>
                  </div>

                  <div className="payment-details p-3 bg-light rounded mb-4">
                    <h5 className="border-bottom pb-2">Payment Information</h5>
                    {paymentDetails.doctor && (
                      <p className="mb-2"><strong>Doctor:</strong> {paymentDetails.doctor}</p>
                    )}
                    <p className="mb-2"><strong>Payment Method:</strong> {paymentDetails.method}</p>
                    <p className="mb-2"><strong>Amount:</strong> Rs.{paymentDetails.amount}</p>
                    <p className="mb-2"><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
                    {paymentDetails.appointmentId && (
                      <p className="mb-2"><strong>Appointment ID:</strong> {paymentDetails.appointmentId}</p>
                    )}
                  </div>

                  <div className="status-message p-3 bg-light rounded mb-4">
                    <h5 className="border-bottom pb-2">Status</h5>
                    <p className="mb-2">Your payment is currently under review. Please wait for approval.</p>
                    <p className="mb-0">You will be notified once your payment has been processed.</p>
                  </div>

                  <div className="text-center mt-4">
                    <PDFDownloadLink
                      document={<PaymentPDF paymentDetails={paymentDetails} />}
                      fileName={`payment-receipt-${new Date().toISOString().split('T')[0]}.pdf`}
                    >
                      {({ blob, url, loading, error }) =>
                        loading ? (
                          <Button variant="primary" disabled className="px-4">
                            <i className="fas fa-spinner fa-spin me-2"></i>
                            Loading PDF...
                          </Button>
                        ) : (
                          <Button variant="success" className="px-4">
                            <i className="fas fa-download me-2"></i>
                            Download Receipt
                          </Button>
                        )
                      }
                    </PDFDownloadLink>
                    <Button
                      variant="info"
                      className="px-4 mt-3"
                      onClick={() => window.location.href = '/mypayments'}
                    >
                      <i className="fas fa-list me-2"></i>
                      My Payments
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            ) : (
              <Card className="shadow-sm">
                <Card.Body className="text-center">
                  <i className="fas fa-exclamation-circle fa-3x text-danger mb-3"></i>
                  <h4>No Payment Details Found</h4>
                  <p className="text-muted">Please make sure you have completed the payment process.</p>
                </Card.Body>
              </Card>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PendingApprovalScreen;
