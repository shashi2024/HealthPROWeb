import { Col, Container, Row, Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Add useLocation
import axios from "axios";
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar";
import "../../styles/Emergency.css";

const Emergency = () => {
  const [emergencyRequests, setEmergencyRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation(); // Get the location object

  useEffect(() => {
    const fetchEmergencyRequests = async () => {
      try {
        const response = await axios.get("/api/emergency-requests");
        setEmergencyRequests(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchEmergencyRequests();
  }, []);

  // Extract the query parameter
  const queryParams = new URLSearchParams(location.search);
  const highlightId = queryParams.get('highlight');

  const handleAssignAmbulance = (requestId) => {
    navigate(`/admin/assign-ambulance/${requestId}`);
  };

  // Function to handle navigation to the Emergency Report
  const handleNavigateToReport = () => {
    navigate("/admin/emergency-report"); // Ensure the correct route
  };

  return (
    <Container fluid className="AdminDashboard">
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar />
        </Col>
        <Col md={9}>
          <div className="patient_list">
            <h2>Emergency Requests</h2>
            <Button variant="primary" onClick={handleNavigateToReport}  className="emergency-report-button">
              Emergency Report
            </Button>

            

            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : emergencyRequests.length === 0 ? (
              <p>No emergency requests found</p>
            ) : (
              <Table striped bordered hover className="emergency-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Contact Number</th>
                    <th>Symptoms</th>
                    <th>Urgency Level</th>
                    <th>Location</th>
                    <th>Additional Info</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {emergencyRequests.map((request) => (
                    <tr key={request._id} style={{ backgroundColor: highlightId === request._id ? 'lightgreen' : 'transparent' }}>
                      <td>{request.name}</td>
                      <td>{request.age}</td>
                      <td>{request.contactnumber}</td>
                      <td>{request.symptoms}</td>
                      <td>{request.urgencylevel}</td>
                      <td>{request.location}</td>
                      <td>{request.additional}</td>
                      <td>
                        <Button
                          variant="primary"
                          onClick={() => handleAssignAmbulance(request._id)}
                        >
                          Assign Ambulance
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Emergency;
