import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom"; // useParams to get the ambulance ID

const UpdateAmbulanceForm = () => {
  const [ambulancenumber, setAmbulanceNumber] = useState("");
  const [vehiclenumber, setVehicleNumber] = useState("");
  const [drivername, setDriverName] = useState("");
  const [drivercontact, setDriverContact] = useState("");
  const [driveremail, setDriverEmail] = useState("");
  const [ambulancetype, setAmbulanceType] = useState("");
  const [availability, setAvailability] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams(); // Get ambulance ID from route params

  // Fetch ambulance data by ID when the component loads
  useEffect(() => {
    const fetchAmbulance = async () => {
      try {
        const response = await axios.get(`/api/ambulances/${id}`);
        const ambulance = response.data;
        setAmbulanceNumber(ambulance.ambulancenumber);
        setVehicleNumber(ambulance.vehiclenumber);
        setDriverName(ambulance.drivername);
        setDriverContact(ambulance.drivercontact);
        setDriverEmail(ambulance.driveremail);
        setAmbulanceType(ambulance.ambulancetype);
        setAvailability(ambulance.availability);
      } catch (error) {
        setError("Failed to load ambulance data");
      }
    };

    fetchAmbulance();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const updatedAmbulance = {
        ambulancenumber,
        vehiclenumber,
        drivername,
        drivercontact,
        driveremail,
        ambulancetype,
        availability,
      };

      await axios.put(`/api/ambulances/${id}`, updatedAmbulance); // Use PUT or PATCH request to update the ambulance
      setSuccess(true);
      navigate("/managementdashboard/ambulances");
    } catch (error) {
      setError(error.response?.data?.message || "Error updating ambulance");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          <h2>Update Ambulance</h2>

          {success && <Alert variant="success">Ambulance updated successfully!</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="ambulanceNumber">
              <Form.Label>Ambulance Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter ambulance number"
                value={ambulancenumber}
                onChange={(e) => setAmbulanceNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="vehicleNumber">
              <Form.Label>Vehicle Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter vehicle number"
                value={vehiclenumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="driverName">
              <Form.Label>Driver Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter driver name"
                value={drivername}
                onChange={(e) => setDriverName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="driverContact">
              <Form.Label>Driver Contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter driver contact"
                value={drivercontact}
                onChange={(e) => setDriverContact(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="driverEmail">
              <Form.Label>Driver Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter driver email"
                value={driveremail}
                onChange={(e) => setDriverEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="ambulanceType">
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

            <Form.Group controlId="availability">
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
              Update Ambulance
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateAmbulanceForm;
