import { useLocation } from "react-router-dom";
import { Card } from "react-bootstrap";

const PendingApprovalScreen = () => {
  const location = useLocation();
  const { paymentDetails } = location.state || {};

  return (
    <div className="container mt-4">
      <h1>Payment Pending Approval</h1>
      {paymentDetails ? (
        <Card className="mt-3">
          <Card.Body>
            <h5>Payment Method: {paymentDetails.method}</h5>
            <p>Amount: Rs.{paymentDetails.amount}</p>
            <p>
              Your payment is currently under review. Please wait for approval.
            </p>
            <p>You will be notified once your payment has been processed.</p>
          </Card.Body>
        </Card>
      ) : (
        <p>No payment details found.</p>
      )}
    </div>
  );
};

export default PendingApprovalScreen;
