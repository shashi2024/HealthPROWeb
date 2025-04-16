import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import AdminDashboardSideNavbar from "../../../components/AdminDashboardSideNavbar";
import "../../../styles/Patients.css";

const UpdatePayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: "",
    method: "",
    status: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch patient details
  useEffect(() => {
    const fetchPayment = async () => {
      setLoading(true); // Set loading to true while fetching
      try {
        const response = await axios.get(
          `http://localhost:5000/api/payments/getonepayment/${id}`
        );
        setFormData({
          amount: response.data.amount,
          method: response.data.method,
          status: response.data.status,
        });
      } catch (error) {
        console.error("Error fetching payment details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPayment();
  }, [id]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while submitting
    try {
      await axios.put(
        `http://localhost:5000/api/payments/updatepayment/${id}`,
        formData
      );
      navigate("/managementdashboard/payments"); // Redirect back to the patient list after update
    } catch (error) {
      console.error("Error updating payments:", error);
    } finally {
      setLoading(false); // Set loading to false after submission
    }
  };

  return (
    <Container
      className="mt-4 update_form"
      style={{
        padding: "20px",
        borderRadius: "30px",
        width: "600px",
      }}
    >
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar /> {/* Add Side Navbar here */}
        </Col>
        <Col md={9}>
          <h2 className="text-center mb-4" style={{ color: "#000" }}>
            Update Payment
          </h2>
          {loading ? ( // Show loader while loading
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <Form
              onSubmit={handleSubmit}
              className="shadow p-4 rounded bg-light"
            >
              <Form.Group controlId="formName">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="text"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  required
                  style={{ borderColor: "#007bff" }}
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Payment Method</Form.Label>
                <Form.Control
                  type="text"
                  name="method"
                  value={formData.method}
                  onChange={handleInputChange}
                  required
                  style={{ borderColor: "#007bff" }}
                />
              </Form.Group>

              <Form.Group controlId="formStatus" className="mt-3">
                <Form.Label>Payment Status</Form.Label>
                <Form.Select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  style={{ borderColor: "#007bff" }}
                >
                  <option value="">Select Status</option>
                  <option value="Paid">Paid</option>
                  <option value="Pending">Pending</option>
                </Form.Select>
              </Form.Group>

              <Button
                variant="danger"
                type="submit"
                className="mt-3"
                style={{ backgroundColor: "#ff3d3d", borderColor: "#ff3d3d" }}
              >
                Save Changes
              </Button>
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UpdatePayment;
