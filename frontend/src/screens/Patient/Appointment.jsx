import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row, Form, Button } from "react-bootstrap"; // Bootstrap components
import { useNavigate } from "react-router-dom"; // For navigation

const Appointment = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contactNumber: "",
    specialization: "",
    hospitalName: "",
    doctorName: "",
    fee: "", // New field for fee
    date: "",
    starttime: "", // Storing as string in 12-hour format (e.g., "6:30 p.m.")
    symptoms: "",
    gender: "",
    address: "",
  });

  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  const specializationOptions = [
    "Cardiology",
    "Dermatology",
    "Neurology",
    "Orthopedics",
    "Pediatrics",
    "Radiology",
    "heart",
  ];

  const hospitalOptions = [
    "City Hospital",
    "General Hospital,Colombo",
    "Children's Hospital",
    "Heart Care Center,Colombo",
    "Lanka Hospital,Colombo",
    "Hemas Hospital,Colombo",
  ];

  useEffect(() => {
    if (formData.specialization && formData.hospitalName) {
      axios
        .get(
          `/api/appointments/doctor/${formData.specialization}/${formData.hospitalName}`
        )
        .then((response) => setDoctors(response.data))
        .catch((error) => console.error(error));
    }
  }, [formData.specialization, formData.hospitalName]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "doctorName") {
      const selectedDoctor = doctors.find(
        (doctor) => doctor.doctorname === value
      );
      if (selectedDoctor) {
        setFormData((prevData) => ({
          ...prevData,
          starttime: selectedDoctor.starttime,
          date: selectedDoctor.date.split("T")[0],
          fee: selectedDoctor.fee,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          starttime: "",
          date: "",
          fee: "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert symptoms to an array
    const formattedSymptoms = formData.symptoms.split(",").map((symptom) => symptom.trim());
  
    // Prepare the form data for submission
    const submissionData = {
      ...formData,
      symptoms: formattedSymptoms, // Ensure symptoms is an array
      age: Number(formData.age), // Ensure age is a number
      fee: Number(formData.fee), // Ensure fee is a number
    };
  
    try {
      console.log("Submitting form data:", submissionData);
      await axios.post("http://localhost:3000/api/appointments/createAppointment", submissionData);
      alert("Appointment Created Successfully");
  
      // Reset form data
      setFormData({
        name: "",
        age: "",
        contactNumber: "",
        specialization: "",
        hospitalName: "",
        doctorName: "",
        fee: "",
        date: "",
        starttime: "",
        symptoms: "",
        gender: "",
        address: "",
      });
  
      // Navigate to the payment screen with the fee as state
      navigate("/payment", { state: { amount: formData.fee } });
  
    } catch (error) {
      console.error("Error creating appointment:", error.response.data);
    }
  };
  
  return (
    <Container fluid className="AdminDashboard">
      <Row className="justify-content-center mb-4">
        {" "}
        {/* Center the buttons */}
        <Col md="auto">
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
        </Col>
        <Col md="auto">
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
        </Col>
        <Col md="auto">
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
        </Col>
      </Row>

      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          {" "}
          {/* Reduced form size */}
          <div className="form-container p-4">
            <h1 className="mb-2 text-center">Book An Appointment</h1>

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="age">
                    <Form.Label>Age</Form.Label>
                    <Form.Control
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="symptoms">
                    <Form.Label>Symptoms</Form.Label>
                    <Form.Control
                      type="text"
                      name="symptoms"
                      value={formData.symptoms}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="contactNumber">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="hospitalName">
                    <Form.Label>Hospital Name</Form.Label>
                    <Form.Control
                      as="select"
                      name="hospitalName"
                      value={formData.hospitalName}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Hospital</option>
                      {hospitalOptions.map((hospital, index) => (
                        <option key={index} value={hospital}>
                          {hospital}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="specialization">
                    <Form.Label>Specialization</Form.Label>
                    <Form.Control
                      as="select"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Specialization</option>
                      {specializationOptions.map((spec, index) => (
                        <option key={index} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="doctorName">
                    <Form.Label>Doctor</Form.Label>
                    <Form.Control
                      as="select"
                      name="doctorName"
                      value={formData.doctorName}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor.doctorname}>
                          {doctor.doctorname}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="fee">
                    <Form.Label>Doctor's Fee</Form.Label>
                    <Form.Control
                      type="text"
                      name="fee"
                      value={formData.fee}
                      readOnly
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="starttime">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                      type="text"
                      name="starttime"
                      placeholder="e.g., 6:30 p.m."
                      value={formData.starttime}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  </Col>
              </Row>

              <Button variant="primary" type="submit" className="w-100">
                Submit Appointment
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Appointment;
