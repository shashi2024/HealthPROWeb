import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../../styles/Reports.css";

const Reports = () => {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch patients from the backend
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { data } = await axios.get("/api/users/patients"); // Fetch the patients list
        setPatients(data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  const handleViewRecords = (patientId) => {
    // Navigate to the Scan component under reports with patientId as a query parameter
    navigate(`/admin/reports/scan?patientId=${patientId}`);
  };

  return (
    <Container fluid className="AdminDashboard">
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar />
        </Col>
        <Col md={9}>
          <div className="report_list">
            <h2>Patients</h2>
            {/* Display patients in a table */}
            <Table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th> {/* New Actions Column */}
                </tr>
              </thead>
              <tbody>
                {patients.length > 0 ? (
                  patients.map((patient, index) => (
                    <tr key={patient._id}>
                      <td>{index + 1}</td> {/* Display index as serial number */}
                      <td>{patient.name}</td>
                      <td>{patient.email}</td>
                      <td>{patient.role}</td>
                      <td>
                        {/* View Records Button */}
                        <Button
                          className="button" // Apply custom button class
                          onClick={() => handleViewRecords(patient._id)}
                        >
                          View Records
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center no-patients"> {/* Center the no patients message */}
                      No patients found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Reports;
