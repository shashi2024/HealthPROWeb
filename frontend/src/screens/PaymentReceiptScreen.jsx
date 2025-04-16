import { useLocation } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import jsPDF from "jspdf";

const PaymentReceiptScreen = () => {
  const location = useLocation();
  const { paymentDetails } = location.state || {};

  const downloadReceipt = () => {
    const doc = new jsPDF();
    const title = "Payment Receipt";
    const body = `
      Payment Method: ${paymentDetails.method}
      Amount: Rs.${paymentDetails.amount}
      ${
        paymentDetails.method === "card"
          ? `Card Number: ${paymentDetails.cardDetails.cardNumber}`
          : ""
      }
      ${
        paymentDetails.method === "insurance"
          ? `Policy Number: ${paymentDetails.insuranceDetails.policyNumber}`
          : ""
      }
      ${
        paymentDetails.method === "insurance"
          ? `Provider: ${paymentDetails.insuranceDetails.provider}`
          : ""
      }
    `;
    doc.text(title, 10, 10);
    doc.text(body, 10, 20);
    doc.save("HealthNet payment_receipt.pdf");
  };

  return (
    <div className="container mt-4">
      <h1>Payment Receipt</h1>
      {paymentDetails ? (
        <Card className="mt-3">
          <Card.Body>
            <h5>Payment Method: {paymentDetails.method}</h5>
            <p>Amount: Rs.{paymentDetails.amount}</p>
            {paymentDetails.method === "card" && (
              <p>Card Number: {paymentDetails.cardDetails.cardNumber}</p>
            )}
            {paymentDetails.method === "insurance" && (
              <>
                <p>
                  Policy Number: {paymentDetails.insuranceDetails.policyNumber}
                </p>
                <p>Provider: {paymentDetails.insuranceDetails.provider}</p>
              </>
            )}
            <Button onClick={downloadReceipt} variant="success">
              Download Receipt
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <p>No payment details found.</p>
      )}
    </div>
  );
};

export default PaymentReceiptScreen;
