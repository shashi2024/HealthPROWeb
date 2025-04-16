import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast"; // For notifications
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // FontAwesome search icon
import {
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap"; // Import Bootstrap components

import AdminDashboardSideNavbar from "../../../components/AdminDashboardSideNavbar"; // Import side navbar

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all appointments on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/appointments/getAllAppointmentsAdmin"
        );
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchData();
  }, []);

  // Function to delete an appointment
  const deleteAppointment = async (appointmentId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/appointments/appointmentdelete/${appointmentId}`
      );
      setAppointments((prevAppointments) =>
        prevAppointments.filter(
          (appointment) => appointment._id !== appointmentId
        )
      );
      toast.success(response.data.msg, { position: "top-right" });
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  // Filter appointments based on the search term
  const filteredAppointments = appointments.filter((appointment) => {
    return (
      appointment.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.hospitalName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.doctorName?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <Container fluid className="AdminDashboard">
      {" "}
      {/* Ensures fluid layout for the dashboard */}
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar /> {/* Side navbar component */}
        </Col>
        <Col md={9}>
          <div className="patient_list">
            {" "}
            {/* Similar to patient_list class in Doctors.jsx */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              {/* Left-side button */}
              <Link to={"/getDeletedAppointments"} className="btn btn-primary">
                Completed Appointment
              </Link>

              {/* Right-side search bar */}
              <InputGroup className="mb-3" style={{ width: "500px" }}>
                {" "}
                {/* Increased width to 500px */}
                <FormControl
                  placeholder="Search by Patient Name, Doctor, or Hospital"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <InputGroup.Text>
                  <FaSearch />
                </InputGroup.Text>
              </InputGroup>
            </div>
            <Table striped bordered hover responsive className="text-center">
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Hospital Name</th>
                  <th>Doctor Name</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>Actions</th> {/* Added Actions column */}
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <tr key={appointment._id}>
                      <td>{appointment.name}</td>
                      <td>{appointment.hospitalName}</td>
                      <td>{appointment.doctorName}</td>
                      <td>{appointment.date.split("T")[0]}</td>{" "}
                      {/* Formatting date to "yyyy-MM-dd" */}
                      <td>{appointment.starttime}</td>
                      <td>
                        <div className="d-flex justify-content-center">
                          {" "}
                          {/* Use flexbox for inline buttons */}
                          <Link
                            to={`/editappointment/${appointment._id}`}
                            className="btn btn-warning btn-sm me-2"
                          >
                            Update
                          </Link>{" "}
                          {/* Add margin-end for spacing */}
                          <Button
                            variant="danger"
                            className="btn-sm"
                            onClick={() => deleteAppointment(appointment._id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7">No appointments found</td>{" "}
                    {/* Adjusted colSpan based on the number of columns */}
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

export default AdminAppointments;
