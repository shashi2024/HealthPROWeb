// src/components/RecommendDoctor.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RecommendationDoctors = () => {
  const [specializations, setSpecializations] = useState([]);
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch unique specializations from the server
    const fetchSpecializations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/doctor/fetchSpecializations"
        );
        setSpecializations(response.data);
      } catch (error) {
        console.error("Error fetching specializations:", error);
      }
    };

    fetchSpecializations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "http://localhost:3000/api/doctor/recommendDoctors",
        {
          params: { specialization: selectedSpecialization },
        }
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  return (
    <div>
      {/* Buttons for navigation */}
      <div
        className="d-flex justify-content-start align-items-center mb-4"
        style={{ width: "100%", maxWidth: "800px" }}
      >
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
          My Appointments
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
          onClick={() => navigate("/getDeletedAppointmentsPatient")}
          style={{
            padding: "10px 15px", // Consistent padding
            whiteSpace: "nowrap", // Prevent wrapping
            textAlign: "center",
            marginLeft: "10px", // Space between buttons
            width: "fit-content", // Fit content width
            backgroundColor: "#0096FF", // #6495EDLight background color
            color: "white", // Set text color to white
            border: "none", // Remove border
          }}
        >
          Completed Appointments
        </Button>
      </div>

      {/* Align Recommend a Doctor to the left */}
      <h2 style={{ textAlign: "left", width: "100%" }}>
        Doctor Recommendation
      </h2>

      {/* Small description to guide users */}
      <p style={{ textAlign: "left", width: "100%", color: "#333" }}>
        Please choose a specialization to find the best doctors in that field.
        You will receive a list of recommended doctors based on your selection.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          width: "100%",
        }}
      >
        <label htmlFor="specialization" style={{ marginBottom: "5px" }}>
          Select Specialization:
        </label>
        <select
          id="specialization"
          value={selectedSpecialization}
          onChange={(e) => setSelectedSpecialization(e.target.value)}
          required
          style={{
            margin: "10px 0",
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "100%", // Ensures the dropdown spans the full width of the container
          }}
        >
          <option value="">--Select--</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
        <button
          type="submit"
          style={{
            padding: "10px 15px",
            backgroundColor: "#5D3FD3",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            marginTop: "10px",
          }}
        >
          Submit
        </button>
      </form>

      {doctors.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left", width: "100%" }}>
          <h2>Recommended Doctors:</h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "20px",
              justifyContent: "flex-start",
            }}
          >
            {doctors.map((doctor) => (
              <div
                key={doctor._id}
                style={{
                  backgroundColor: "#0096FF",
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "15px",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  width: "250px",
                  textAlign: "left",
                }}
              >
                <h3 style={{ margin: "0 0 10px 0" }}>
                  <strong>👨‍⚕️</strong>
                  {doctor.doctorname}
                </h3>
                <p style={{ margin: "5px 0" }}>
                  <strong>🔍 Experience:</strong> {doctor.experience} years
                </p>
                <p style={{ margin: "5px 0" }}>
                  <strong>🔍 Hospital:</strong> {doctor.hospitalName}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationDoctors;
