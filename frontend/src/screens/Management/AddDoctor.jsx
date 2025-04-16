import React, { useState } from "react";
import axios from "axios"; // Ensure axios is installed
import toast from "react-hot-toast"; // Optional for notifications
import { Col, Container, Row, Form, Button } from "react-bootstrap"; // Using Bootstrap components
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar"; // Side Navbar component
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

import "../../styles/Doctors.css"; // Same styling as Doctors page

const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    doctorname: "",
    specialization: "",
    fee: "",
    starttime: "",
    date: "",
    slot: "",
    timings: "",
    hospitalName: "",
    experience: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleFinish = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/doctor/dcreate", doctor);
      toast.success("Record added successfully!", { position: "top-right" }); // Success message
      console.log(response.data);
      
      // Reset the form
      setDoctor({
        doctorname: "",
        specialization: "",
        fee: "",
        starttime: "",
        date: "",
        slot: "",
        timings: "",
        hospitalName: "",
        experience: "",
      });

      // Navigate to the /doctors page
      navigate("/doctors");
    } catch (error) {
      toast.error("Error adding doctor. Please try again.", { position: "top-right" });
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
          <div className="patient_list">
            <h1 className="text-center mb-4">Add Doctor</h1> {/* Centered Title */}
            
            {/* Centering form and controlling width */}
            <Row className="justify-content-center">
              <Col md={10}> {/* Set the width of the form */}
                <Form className="form-reduce-font" onSubmit={handleFinish}>
                  <Row> {/* Grouping form fields horizontally */}
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

                  <Row>
                    <Col md={12}>
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
                    </Col>
                  </Row>

                  <Button variant="primary" type="submit" className="mt-3">
                    Add Doctor
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

export default AddDoctor;
