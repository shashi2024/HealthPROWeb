import React, { useState, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed
import toast from "react-hot-toast"; // Optional for notifications
import { Col, Container, Row, Form, Button } from "react-bootstrap"; // Using Bootstrap components
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar"; // Side Navbar component
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate and useParams for navigation and route parameters

import "../../styles/Doctors.css"; // Same styling as Doctors page

const EditDoctor = () => {
  const { id } = useParams(); // Get the doctor's ID from the URL
  const [doctor, setDoctor] = useState({
    doctorname: "",
    specialization: "",
    fee: "",
    starttime: "",
    date: "",
    slot: "",
    timings: "",
    hospitalName: "",
    experience: ""
  });

  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch the existing doctor details when the component mounts
  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/doctor/dgetone/${id}`); // Fetch doctor details by ID
        setDoctor(response.data);
      } catch (error) {
        toast.error("Error fetching doctor details. Please try again.", { position: "top-right" });
        console.error(error);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleFinish = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/api/doctor/dupdate/${id}`, doctor); // Update doctor details
      toast.success("Doctor updated successfully!", { position: "top-right" }); // Success message
      console.log(response.data);

      // Navigate to the /doctors page
      navigate("/doctors");
    } catch (error) {
      toast.error("Error updating doctor. Please try again.", { position: "top-right" });
      console.error(error);
    }
  };

  return (
    <Container fluid className="AdminDashboard">
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar />
        </Col>
        <Col md={9}>
          <div className="d-flex flex-column align-items-center patient_list">
            <h1 className="mb-4 text-center">Update Doctor</h1> {/* Centering the heading */}
            
            {/* Centering form and controlling width */}
            <Row className="justify-content-center w-100">
              <Col md={8} lg={6}> {/* Limit the width to 6/12 on medium screens */}
                <Form className="form-reduce-font" onSubmit={handleFinish}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="doctorname">
                        <Form.Label>Doctor Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="doctorname"
                          value={doctor.doctorname}
                          onChange={inputHandler}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="specialization">
                        <Form.Label>Specialization</Form.Label>
                        <Form.Control
                          type="text"
                          name="specialization"
                          value={doctor.specialization}
                          onChange={inputHandler}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="hospitalName">
                        <Form.Label>Hospital Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="hospitalName"
                          value={doctor.hospitalName}
                          onChange={inputHandler}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="experience">
                        <Form.Label>Experience</Form.Label>
                        <Form.Control
                          type="text"
                          name="experience"
                          value={doctor.experience}
                          onChange={inputHandler}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="fee">
                        <Form.Label>Fee</Form.Label>
                        <Form.Control
                          type="number"
                          name="fee"
                          value={doctor.fee}
                          onChange={inputHandler}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="starttime">
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                          type="text"
                          name="starttime"
                          value={doctor.starttime}
                          onChange={inputHandler}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="date">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                          type="date"
                          name="date"
                          value={doctor.date}
                          onChange={inputHandler}
                          required
                        />
                      </Form.Group>
                    </Col>

                    <Col md={6}>
                      <Form.Group className="mb-3" controlId="slot">
                        <Form.Label>Slot</Form.Label>
                        <Form.Control
                          type="number"
                          name="slot"
                          value={doctor.slot}
                          onChange={inputHandler}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3" controlId="timings">
                    <Form.Label>Timings</Form.Label>
                    <Form.Control
                      type="text"
                      name="timings"
                      value={doctor.timings}
                      onChange={inputHandler}
                      required
                    />
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100"> {/* Full-width button */}
                    Update Doctor
                  </Button>
                </Form>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default EditDoctor;
