// components/CompletedAppointment.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { InputGroup } from "react-bootstrap"; // Import InputGroup for adding the search icon
const CompleteAppointmentPatient = () => {
  const [completedAppointments, setCompletedAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/appointments/getDeletedAppointmentsPatient"
        );
        setCompletedAppointments(response.data);
      } catch (error) {
        console.error("Error fetching completed appointments:", error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredAppointments = completedAppointments.filter((appointment) => {
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
    <div className="AdminDashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button
          onClick={() => navigate("/getAllAppointments")}
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
          My Appointment
        </Button>
        <Button
          onClick={() => navigate("/createAppointment")}
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
            backgroundColor: "#0096FF", // Light background color
            color: "white", // Set text color to white
            border: "none", // Remove border
          }}
        >
          Doctor Recommendation
        </Button>

        <InputGroup>
          <Form.Control
            type="text"
            placeholder="Search by Hospital Name or Doctor Name"
            value={searchTerm}
            onChange={handleSearch}
          />
          <InputGroup.Text>🔍 {/* Search Icon */}</InputGroup.Text>
        </InputGroup>
      </div>
      <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>
        Completed Appointments
      </h2>{" "}
      {/* Decreased title size */}
      <Table
        striped
        bordered
        hover
        className="text-center"
        style={{ backgroundColor: "#e6f7ff" }} // Light blue background for the table
      >
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Hospital Name</th>
            <th>Doctor Name</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredAppointments.length > 0 ? (
            filteredAppointments.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.name}</td>
                <td>{appointment.hospitalName}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.date.split("T")[0]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No completed appointments found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CompleteAppointmentPatient;
