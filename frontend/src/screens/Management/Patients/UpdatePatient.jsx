import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import AdminDashboardSideNavbar from "../../../components/AdminDashboardSideNavbar";
import "../../../styles/Patients.css";

const UpdatePatient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  // Fetch patient details
  useEffect(() => {
    const fetchPatient = async () => {
      setLoading(true); // Set loading to true while fetching
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/getoneuser/${id}`
        );
        setFormData({
          name: response.data.name,
          email: response.data.email,
          role: response.data.role,
          password: "", // Reset password field
          confirmPassword: "", // Reset confirm password field
        });
      } catch (error) {
        console.error("Error fetching patient details:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchPatient();
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
        `http://localhost:5000/api/users/updateuser/${id}`,
        formData
      );
      navigate("/managementdashboard/patients"); // Redirect back to the patient list after update
    } catch (error) {
      console.error("Error updating patient:", error);
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
            Update Patient Profile
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
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{ borderColor: "#007bff" }} // Customize border color
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mt-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{ borderColor: "#007bff" }} // Customize border color
                />
              </Form.Group>

              <Form.Group controlId="formRole" className="mt-3">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  disabled
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  required
                  style={{ borderColor: "#007bff" }} // Customize border color
                />
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

export default UpdatePatient;
