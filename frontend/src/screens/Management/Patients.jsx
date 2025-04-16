import { useEffect, useState } from "react";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import axios from "axios";
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar";
import { useNavigate } from "react-router-dom";

import "../../styles/Patients.css";

const Patients = () => {
  const [users, setUsers] = useState([]);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/getallusers"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const patients = users.filter(
    (user) => user.role.toLowerCase() === "patient"
  );

  const navigate = useNavigate();

  const handleUpdate = (userId) => {
    navigate(`/managementdashboard/patients/updatepatients/${userId}`);
  };

  // Handler for deleting a user
  const handleDelete = async (userId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/users/deleteuser/${userId}`
      );
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <Container fluid className="AdminDashboard">
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar /> {/* Add Side Navbar here */}
        </Col>
        <Col md={9}>
          <div className="patient_list">
            <h2>All Patients</h2>
            <Table striped bordered hover responsive="sm" className="mt-4">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr key={patient._id}>
                    <td>{index + 1}</td>
                    <td>{patient.name}</td>
                    <td>{patient.email}</td>
                    <td>{patient.role}</td>
                    <td>
                      <Button
                        variant="primary"
                        size="sm"
                        className="me-2"
                        onClick={() => handleUpdate(patient._id)}
                      >
                        Update
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(patient._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Patients;
