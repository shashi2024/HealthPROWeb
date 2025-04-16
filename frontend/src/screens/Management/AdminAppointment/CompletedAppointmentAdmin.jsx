// components/CompletedAppointment.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col } from 'react-bootstrap'; // Import Bootstrap components
import AdminDashboardSideNavbar from "../../../components/AdminDashboardSideNavbar"; // Import side navbar

const CompletedAppointments = () => {
  const [completedAppointments, setCompletedAppointments] = useState([]);

  // Fetch completed appointments on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/appointments/getDeletedAppointments');
        setCompletedAppointments(response.data);
      } catch (error) {
        console.error("Error fetching completed appointments:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Container fluid className="AdminDashboard"> {/* Ensures fluid layout for the dashboard */} 
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar /> {/* Side navbar component */} 
        </Col>
        <Col md={9}>
          <div className="patient_list"> {/* Similar to patient_list class for consistency */} 
            <h2 className="mb-4">Completed Appointments</h2> {/* Heading for the page */} 
            <Table striped bordered hover responsive className="text-center"> {/* Responsive table with hover effect */} 
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Hospital Name</th>
                  <th>Doctor Name</th>
                  <th>Date</th>
                  <th>Start Time</th>
                 
                </tr>
              </thead>
              <tbody>
                {completedAppointments.length > 0 ? (
                  completedAppointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td>{appointment.name}</td>
                      <td>{appointment.hospitalName}</td>
                      <td>{appointment.doctorName}</td>
                      <td>{appointment.date.split('T')[0]}</td> {/* Formatting date to "yyyy-MM-dd" */} 
                      <td>{appointment.starttime}</td>
                     
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">No completed appointments found</td> {/* Message if no data is available */} 
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

export default CompletedAppointments;
