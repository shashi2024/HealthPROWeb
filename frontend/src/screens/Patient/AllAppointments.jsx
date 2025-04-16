import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Form,
  Card,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // Fetch all appointments on component mount
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/appointments/getAllAppointments")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAppointments = appointments.filter((appointment) => {
    const hospitalName = appointment.hospitalName
      ? appointment.hospitalName.toLowerCase()
      : "";
    const doctorName = appointment.doctorName
      ? appointment.doctorName.toLowerCase()
      : "";
    const search = searchTerm.toLowerCase();

    return hospitalName.includes(search) || doctorName.includes(search);
  });

  return (
    <div
      className="AdminDashboard"
      style={{
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        minHeight: "100vh",
        margin: "0",
        padding: "20px",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button
          onClick={() => navigate("/createAppointment")}
          style={{
            padding: "10px 15px", // Consistent padding
            whiteSpace: "nowrap", // Prevent wrapping to the next line
            textAlign: "center", // Center text
            width: "fit-content", // Button adjusts to the content size
            backgroundColor: "#00008B", // Custom background color
            color: "#fff", // White text color for contrast
            border: "none", // Remove border if needed
            borderRadius: "5px", // Optional: Rounded corners
          }}
        >
          Book An Appointment
        </Button>

        <Button
          onClick={() => navigate("/recommendDoctors")}
          style={{
            padding: "10px 15px", // Consistent padding
            whiteSpace: "nowrap", // Prevent wrapping
            textAlign: "center",
            marginLeft: "10px", // Space between buttons
            width: "fit-content", // Fit content width
            backgroundColor: "#0F52BA", // Light background color
            color: "white", // Set text color to white
            border: "none", // Remove border
          }}
        >
          Doctor Recommendation
        </Button>

        <Button
          onClick={() => navigate("/getDeletedAppointmentsPatient")}
          style={{
            padding: "10px 15px", // Consistent padding
            whiteSpace: "nowrap", // Prevent wrapping
            textAlign: "center",
            marginLeft: "10px", // Space between buttons
            width: "fit-content", // Fit content width
            backgroundColor: "#0096FF", // Light background color
            color: "white", // Set text color to white
            border: "none", // Remove border
          }}
        >
          Completed Appointments
        </Button>

        <InputGroup style={{ width: "400px", marginLeft: "10px" }}>
          <Form.Control
            type="text"
            placeholder="Search by Hospital Name or Doctor Name"
            value={searchTerm}
            onChange={handleSearch}
            style={{ fontSize: "12px" }} // Adjust the font size here
          />
          <InputGroup.Text>🔍 {/* Search Icon */}</InputGroup.Text>
        </InputGroup>
      </div>

      <h5 className="text-center mb-4">All Appointments</h5>
      <Table
        striped
        bordered
        hover
        responsive
        className="text-center"
        style={{ backgroundColor: "#e6f7ff" }} // Light blue background for the table
      >
        <thead>
          <tr>
            <th>Hospital Name</th>
            <th>Doctor Name</th>
            <th>Fee</th>
            <th>Date</th>
            <th>Start Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.hospitalName}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.fee}</td>
                <td>{appointment.date.split("T")[0]}</td>{" "}
                {/* Formatting date to "yyyy-MM-dd" */}
                <td>{appointment.starttime}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No appointments found</td>{" "}
              {/* Adjusted colSpan based on number of columns */}
            </tr>
          )}
        </tbody>
      </Table>

      {/* Notices Section */}
      <h5 className="text mt-5">Notices</h5>
      <Row className="mt-4">
        <Col md={6}>
          <Card
            className="h-100"
            style={{ backgroundColor: "#f9f9f9", padding: "20px" }}
          >
            <Card.Body>
              <Card.Text>
                Always check your all appointments table to get the updated
                details about your appointments.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card
            className="h-100"
            style={{ backgroundColor: "#f9f9f9", padding: "20px" }}
          >
            <Card.Body>
              <Card.Text>
                Do you want to change the appointment? Please contact us at{" "}
                <strong>healthnet@gmail.com</strong> or call us at{" "}
                <strong>0112345678</strong>.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AllAppointments;
