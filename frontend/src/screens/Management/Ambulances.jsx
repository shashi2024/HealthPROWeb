import { Button, Col, Container, Row, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Import the icons
import "../../styles/Ambulances.css";

const Ambulances = () => {
  const [ambulances, setAmbulances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch ambulance data from the backend
  useEffect(() => {
    const fetchAmbulances = async () => {
      try {
        const response = await axios.get("/api/ambulances");
        setAmbulances(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAmbulances();
  }, []);

  const handleAddAmbulance = () => {
    navigate("/admin/add-ambulance");
  };

  const handleUpdateAmbulance = (id) => {
    // Navigate to the update form with the ambulance ID
    navigate(`/admin/update-ambulance/${id}`);
  };

  const handleDeleteAmbulance = async (id) => {
    if (window.confirm("Are you sure you want to delete this ambulance?")) {
      try {
        await axios.delete(`/api/ambulances/${id}`);
        setAmbulances(ambulances.filter((ambulance) => ambulance._id !== id));
      } catch (error) {
        alert("Error deleting ambulance: " + error.message);
      }
    }
  };

  return (
    <Container fluid className="AdminDashboard">
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar />
        </Col>
        <Col md={9}>
          <div className="patient_list">
            <h2>Ambulance List</h2>
            <Button variant="primary" onClick={handleAddAmbulance} className="mb-3">
              Add Ambulance
            </Button>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : ambulances.length === 0 ? (
              <p>No ambulances found</p>
            ) : (
              <Table striped bordered hover className="ambulance-table">
                <thead>
                  <tr>
                    <th>Ambulance Number</th>
                    <th>Vehicle Number</th>
                    <th>Driver Name</th>
                    <th>Driver Contact</th>
                    <th>Driver Email</th>
                    <th>Ambulance Type</th>
                    <th>Availability</th>
                    <th>Actions</th> {/* Add column for actions */}
                  </tr>
                </thead>
                <tbody>
                  {ambulances.map((ambulance) => (
                    <tr key={ambulance._id}>
                      <td>{ambulance.ambulancenumber}</td>
                      <td>{ambulance.vehiclenumber}</td>
                      <td>{ambulance.drivername}</td>
                      <td>{ambulance.drivercontact}</td>
                      <td>{ambulance.driveremail}</td>
                      <td>{ambulance.ambulancetype}</td>
                      <td>{ambulance.availability}</td>
                      <td>
                        {/* Replace buttons with Font Awesome icons */}
                        <FontAwesomeIcon
                          icon={faEdit}
                          onClick={() => handleUpdateAmbulance(ambulance._id)}
                          style={{ cursor: 'pointer', marginRight: '10px', color: 'orange' }}
                          title="Update"
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => handleDeleteAmbulance(ambulance._id)}
                          style={{ cursor: 'pointer', color: 'red' }}
                          title="Delete"
                        />
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

export default Ambulances;
