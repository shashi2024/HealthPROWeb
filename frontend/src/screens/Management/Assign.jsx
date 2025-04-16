import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar";
import "../../styles/Assign.css";

const Assign = () => {
  const { requestId } = useParams(); // Get the emergency request ID from the URL
  const [emergencyRequest, setEmergencyRequest] = useState(null);
  const [availableAmbulances, setAvailableAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the emergency request details and available ambulances
    const fetchData = async () => {
      try {
        const requestResponse = await axios.get(`/api/emergency-requests/${requestId}`);
        setEmergencyRequest(requestResponse.data);

        const ambulanceResponse = await axios.get("/api/ambulances"); // Get all ambulances
        // Filter for available ambulances
        const available = ambulanceResponse.data.filter(ambulance => ambulance.availability === 'Available');
        setAvailableAmbulances(available);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [requestId]);

  const handleSendEmail = async (driveremail) => {
    const emailBody = `
      Request ID: ${emergencyRequest._id}
      Name: ${emergencyRequest.name}
      Age: ${emergencyRequest.age}
      Contact Number: ${emergencyRequest.contactnumber}
      Symptoms: ${emergencyRequest.symptoms}
      Urgency Level: ${emergencyRequest.urgencylevel}
      Location: ${emergencyRequest.location}
      Additional note: ${emergencyRequest.additional}
    `;

    try {
      const response = await axios.post('/api/ambulances/send-email', {
        driveremail,
        emailBody
      });
      if (response.status === 200) {
        alert('Email sent successfully!');
      }
    } catch (error) {
      alert('Failed to send email.');
    }
  };

  const updateAmbulanceAvailability = async (ambulanceId) => {
    try {
      const response = await axios.put(`/api/ambulances/${ambulanceId}`, {
        availability: 'Unavailable'
      });
      if (response.status === 200) {
        setAvailableAmbulances(prevAmbulances => 
          prevAmbulances.map(ambulance => 
            ambulance._id === ambulanceId 
              ? { ...ambulance, availability: 'Unavailable' } 
              : ambulance
          )
        );
        alert('Ambulance availability updated to Unavailable.');
        
        // Navigate to the Emergency page and pass the requestId
        navigate(`/managementdashboard/emergency?highlight=${requestId}`);
      }
    } catch (error) {
      alert('Failed to update ambulance availability.');
    }
  };


  return (
    <Container fluid className="AdminDashboard">
      <Container fluid className="back">
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar />
        </Col>
        <Col md={9}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : emergencyRequest ? (
            <div className="patient_list">
              <h2>Assign Ambulance for Emergency Request</h2>

              {/* Emergency Request Details as Table */}
              <Table bordered className="request-details-table">
                <tbody>
                  <tr>
                    <td><strong>Request ID:</strong></td>
                    <td>{emergencyRequest._id}</td>
                  </tr>
                  <tr>
                    <td><strong>Urgency Level:</strong></td>
                    <td>{emergencyRequest.urgencylevel}</td>
                  </tr>
                </tbody>
              </Table>

              <h3>Available Ambulances</h3>
              {availableAmbulances.length === 0 ? (
                <p>No available ambulances</p>
              ) : (
                <Table striped bordered hover className="available-ambulance-table">
                  <thead>
                    <tr>
                      <th>Ambulance Number</th>
                      <th>Vehicle Number</th>
                      <th>Driver Name</th>
                      <th>Driver Contact</th>
                      <th>Driver Email</th>
                      <th>Ambulance Type</th>
                      <th>Availability</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {availableAmbulances.map((ambulance) => (
                      <tr key={ambulance._id}>
                        <td>{ambulance.ambulancenumber}</td>
                        <td>{ambulance.vehiclenumber}</td>
                        <td>{ambulance.drivername}</td>
                        <td>{ambulance.drivercontact}</td>
                        <td>{ambulance.driveremail}</td>
                        <td>{ambulance.ambulancetype}</td>
                        <td>{ambulance.availability}</td>
                        <td>
                        <div className="button-container" style={{ display: 'flex', gap: '10px' }}> {/* Flexbox container for buttons */}
                          <Button
                            variant="success"
                            onClick={() => handleSendEmail(ambulance.driveremail)}
                          >
                            Assign
                          </Button>
                          <Button
                            variant="success"
                            onClick={() => updateAmbulanceAvailability(ambulance._id)} // Call update function
                          >
                            Confirm
                          </Button>
                        </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          ) : (
            <p>No emergency request found</p>
          )}
        </Col>
      </Row>
      </Container>
    </Container>
  );
};

export default Assign;
