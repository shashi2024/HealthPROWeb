import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useProcessPaymentMutation } from "../slices/paymentApiSlice";
import { toast } from "react-toastify";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  // const [amount, setAmount] = useState("");

  const location = useLocation();
  const { amount } = location.state || { amount: 0 };

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvc: "",
  });
  const [insuranceDetails, setInsuranceDetails] = useState({
    policyNumber: "",
    provider: "",
  });
  const navigate = useNavigate();

  const [processPayment, { isLoading }] = useProcessPaymentMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  const insuranceProviders = [
    "Sri Lanka Insurance",
    "Janashakthi Insurance",
    "Union Assurance",
    "HNB General Insurance",
    "Ceylinco Insurance",
    "AIA Insurance",
    "Lanka Orix Leasing Company",
    "Sampath Insurance",
    "AIA General Insurance",
    "Fairfirst Insurance",
  ];

  const submitHandler = async (e) => {
    e.preventDefault();

    // Merge expiryMonth and expiryYear into a single expiry date string
    const expiryDate = `${cardDetails.expiryMonth}/${cardDetails.expiryYear}`;

    const paymentData = {
      method: paymentMethod,
      amount: Number(amount),
      ...(paymentMethod === "card" && {
        cardDetails: {
          ...cardDetails,
          expiry: expiryDate,
        },
      }),
      ...(paymentMethod === "insurance" && { insuranceDetails }),
    };

    try {
      await processPayment(paymentData).unwrap();

      // Handle different payment methods
      if (paymentMethod === "cash" || paymentMethod === "insurance") {
        // Display a success toast indicating the payment is pending approval
        toast.success(
          `Payment of Rs.${amount} via ${paymentMethod} is successful. Please wait for approval.`,
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            style: {
              backgroundColor: "#a9dcf9",
              color: "black",
              fontSize: "18px",
              fontWeight: "bold",
              fontFamily: "monospace",
            },
          }
        );

        // Navigate to pending approval screen
        navigate("/pendingapproval", {
          state: {
            paymentDetails: {
              method: paymentData.method,
              amount: paymentData.amount,
            },
          },
        });
      } else {
        // Display a success toast for card payments
        toast.success("Payment successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          style: {
            backgroundColor: "#a9dcf9",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: "monospace",
          },
        });

        // Navigate to receipt screen for card payments
        navigate("/mypayments", {
          state: {
            paymentDetails: {
              method: paymentData.method,
              amount: paymentData.amount,
              cardDetails: paymentMethod === "card" ? cardDetails : null,
              insuranceDetails:
                paymentMethod === "insurance" ? insuranceDetails : null,
            },
          },
        });
      }
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Payment failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        style: {
          backgroundColor: "#ffd5cc",
          color: "black",
          fontSize: "16px",
          fontWeight: "bold",
          fontFamily: "monospace",
        },
      });
    }
  };

  return (
    <FormContainer>
      <h1>Payment</h1>
      <Form onSubmit={submitHandler}>
        {/* Amount Input */}
        <Form.Group className="my-2" controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter amount"
            value={amount}
            // onChange={(e) => setAmount(e.target.value)}
            readOnly
          ></Form.Control>
        </Form.Group>

        {/* Payment Method Selection */}
        <Form.Group className="my-2" controlId="paymentMethod">
          <Form.Label>Select Payment Method</Form.Label>
          <div className="d-flex">
            <Form.Check
              type="radio"
              id="paymentCard"
              label="Credit/Debit Card"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === "card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="me-3"
            />
            <Form.Check
              type="radio"
              id="paymentCash"
              label="Cash"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === "cash"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="me-3"
            />
            <Form.Check
              type="radio"
              id="paymentInsurance"
              label="Insurance"
              name="paymentMethod"
              value="insurance"
              checked={paymentMethod === "insurance"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="me-3"
            />
          </div>
        </Form.Group>

        {/* Card Details Fields */}
        {paymentMethod === "card" && (
          <>
            <Form.Group className="my-2" controlId="cardNumber">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter card number"
                value={cardDetails.cardNumber}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                }
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="expiry">
              <Form.Label>Expiry Date</Form.Label>
              <div className="d-flex">
                <Form.Control
                  type="text"
                  placeholder="MM"
                  value={cardDetails.expiryMonth}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      expiryMonth: e.target.value,
                    })
                  }
                  required
                  style={{ width: "55px", marginRight: "10px" }}
                />
                <Form.Control
                  type="text"
                  placeholder="YY"
                  value={cardDetails.expiryYear}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      expiryYear: e.target.value,
                    })
                  }
                  required
                  style={{ width: "55px" }}
                />
              </div>
            </Form.Group>

            <Form.Group className="my-2" controlId="cvc">
              <Form.Label>CVC</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter CVC"
                value={cardDetails.cvc}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cvc: e.target.value })
                }
                required
                style={{ width: "105px" }}
              ></Form.Control>
            </Form.Group>
          </>
        )}

        {/* Insurance Details Fields */}
        {paymentMethod === "insurance" && (
          <>
            <Form.Group className="my-2" controlId="policyNumber">
              <Form.Label>Policy Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter policy number"
                value={insuranceDetails.policyNumber}
                onChange={(e) =>
                  setInsuranceDetails({
                    ...insuranceDetails,
                    policyNumber: e.target.value,
                  })
                }
                required
              ></Form.Control>
            </Form.Group>
            <Form.Group className="my-2" controlId="provider">
              <Form.Label>Insurance Provider</Form.Label>
              <Form.Select
                value={insuranceDetails.provider}
                onChange={(e) =>
                  setInsuranceDetails({
                    ...insuranceDetails,
                    provider: e.target.value,
                  })
                }
                required
              >
                <option value="">Select Provider</option>
                {insuranceProviders.map((provider, index) => (
                  <option key={index} value={provider}>
                    {provider}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </>
        )}

        <Button type="submit" variant="primary" className="mt-3">
          Pay Now
        </Button>

        {isLoading && <Loader />}
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
