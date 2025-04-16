// AddAmbulanceForm.jsx
import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // useNavigate instead of useHistory
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import react-toastify CSS

const AddAmbulanceForm = () => {
  const [ambulancenumber, setAmbulanceNumber] = useState("");
  const [vehiclenumber, setVehicleNumber] = useState("");
  const [drivername, setDriverName] = useState("");
  const [drivercontact, setDriverContact] = useState("");
  const [driveremail, setDriverEmail] = useState("");
  const [ambulancetype, setAmbulanceType] = useState("");
  const [availability, setAvailability] = useState("Available");
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // useNavigate replaces useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const newAmbulance = {
        ambulancenumber,
        vehiclenumber,
        drivername,
        drivercontact,
        driveremail,
        ambulancetype,
        availability,
      };

      await axios.post("/api/ambulances", newAmbulance);

      // Show success toast message
      toast.success("Ambulance added successfully!", {
        position: "top-right",
        autoClose: 2000, // Auto close after 2 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Redirect to Ambulances list after a slight delay to allow toast to show
      setTimeout(() => {
        navigate("/managementdashboard/ambulances");
      }, 2000); // 2-second delay
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Error adding ambulance";
      setError(errorMessage);

      // Show error toast message
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000, // Auto close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <Container>
      {/* ToastContainer is responsible for rendering the toasts */}
      <ToastContainer />

      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>Add Ambulance</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="ambulanceNumber" className="mb-3">
              <Form.Label>Ambulance Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ambulance number"
                value={ambulancenumber}
                onChange={(e) => setAmbulanceNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="vehicleNumber" className="mb-3">
              <Form.Label>Vehicle Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter vehicle number"
                value={vehiclenumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="driverName" className="mb-3">
              <Form.Label>Driver Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter driver name"
                value={drivername}
                onChange={(e) => setDriverName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="driverContact" className="mb-3">
              <Form.Label>Driver Contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter driver contact"
                value={drivercontact}
                onChange={(e) => setDriverContact(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="driverEmail" className="mb-3">
              <Form.Label>Driver Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter driver email"
                value={driveremail}
                onChange={(e) => setDriverEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="ambulanceType" className="mb-3">
              <Form.Label>Ambulance Type</Form.Label>
              <Form.Control
                as="select"
                value={ambulancetype}
                onChange={(e) => setAmbulanceType(e.target.value)}
                required
              >
                <option value="">Select type</option>
                <option value="Basic">Basic</option>
                <option value="Advanced">Advanced</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="availability" className="mb-3">
              <Form.Label>Availability</Form.Label>
              <Form.Control
                as="select"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                required
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Add Ambulance
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AddAmbulanceForm;
