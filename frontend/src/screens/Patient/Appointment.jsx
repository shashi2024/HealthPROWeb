import { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row, Form, Button } from "react-bootstrap"; // Bootstrap components
import { useNavigate } from "react-router-dom"; // For navigation
import "../../styles/Appointments.css"; // Custom styles

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

  const [errors, setErrors] = useState({});
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

  // Validation rules
  const validateForm = () => {
    const newErrors = {};
    
    // Name validation - letters only
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    } else if (formData.name.length > 50) {
      newErrors.name = "Name cannot exceed 50 characters";
    } else if (!/^[A-Za-z]+$/.test(formData.name)) {
      newErrors.name = "Name must contain only letters (A-Z, a-z)";
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (isNaN(formData.age) || formData.age < 0 || formData.age > 120) {
      newErrors.age = "Please enter a valid age between 0 and 120";
    }

    // Contact number validation
    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact number is required";
    } else if (!/^[0-9]{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must be exactly 10 digits";
    } else if (!/^[0-9]+$/.test(formData.contactNumber)) {
      newErrors.contactNumber = "Contact number must contain only numbers";
    }

    // Specialization validation
    if (!formData.specialization) {
      newErrors.specialization = "Please select a specialization";
    }

    // Hospital validation
    if (!formData.hospitalName) {
      newErrors.hospitalName = "Please select a hospital";
    }

    // Doctor validation
    if (!formData.doctorName) {
      newErrors.doctorName = "Please select a doctor";
    }

    // Date validation
    if (!formData.date) {
      newErrors.date = "Date is required";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      if (selectedDate < today) {
        newErrors.date = "Please select a future date";
      }
    }

    // Time validation
    if (!formData.starttime) {
      newErrors.starttime = "Time is required";
    }

    // Symptoms validation - letters only
    if (!formData.symptoms.trim()) {
      newErrors.symptoms = "Symptoms are required";
    } else if (formData.symptoms.length < 5) {
      newErrors.symptoms = "Symptoms must be at least 5 characters long";
    } else if (!/^[A-Za-z\s,]+$/.test(formData.symptoms)) {
      newErrors.symptoms = "Symptoms must contain only letters, spaces, and commas";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }

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
    
    if (!validateForm()) {
      return;
    }
  
    // Convert symptoms to an array
    const formattedSymptoms = formData.symptoms.split(",").map((symptom) => symptom.trim());
  
    // Prepare the form data for submission
    const submissionData = {
      ...formData,
      symptoms: formattedSymptoms,
      age: Number(formData.age),
      fee: Number(formData.fee),
    };
  
    try {
      console.log("Submitting form data:", submissionData);
      await axios.post("http://localhost:3000/api/appointments/createAppointment", submissionData);
      alert("Appointment Created Successfully");
  
      // Reset form data and errors
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
      setErrors({});
  
      // Navigate to the payment screen with the fee as state
      navigate("/payment", { state: { amount: formData.fee } });
  
    } catch (error) {
      console.error("Error creating appointment:", error.response?.data);
      alert(error.response?.data?.error || "Error creating appointment");
    }
  };
  
  return (
    <Container fluid className="AdminDashboard">
      <Row className="justify-content-center mb-4 ">
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
              backgroundColor: "#24cfd3", // Custom background color
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
              backgroundColor: "#1c9ea0", // Light background color
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
              backgroundColor: "#037c80", // #6495EDLight background color
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
          <div className="form-container p-4 ">
            <h1 className="mb-2 text-center">Book An Appointment</h1>

            <Form 
            className="form1"
            onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Patient Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onInput={e => {
                        e.target.value = e.target.value.replace(/[^A-Za-z]/g, '');
                      }}
                      isInvalid={!!errors.name}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.name}
                    </Form.Control.Feedback>
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
                      isInvalid={!!errors.age}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.age}
                    </Form.Control.Feedback>
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
                      isInvalid={!!errors.symptoms}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.symptoms}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="gender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      isInvalid={!!errors.gender}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      {errors.gender}
                    </Form.Control.Feedback>
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
                      onInput={e => {
                        // Allow only numbers and limit to 10 digits
                        e.target.value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
                      }}
                      isInvalid={!!errors.contactNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.contactNumber}
                    </Form.Control.Feedback>
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
                      isInvalid={!!errors.hospitalName}
                    >
                      <option value="">Select Hospital</option>
                      {hospitalOptions.map((hospital, index) => (
                        <option key={index} value={hospital}>
                          {hospital}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.hospitalName}
                    </Form.Control.Feedback>
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
                      isInvalid={!!errors.specialization}
                    >
                      <option value="">Select Specialization</option>
                      {specializationOptions.map((spec, index) => (
                        <option key={index} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.specialization}
                    </Form.Control.Feedback>
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
                      isInvalid={!!errors.doctorName}
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor.doctorname}>
                          {doctor.doctorname}
                        </option>
                      ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid">
                      {errors.doctorName}
                    </Form.Control.Feedback>
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
                      isInvalid={!!errors.date}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.date}
                    </Form.Control.Feedback>
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
                      isInvalid={!!errors.starttime}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.starttime}
                    </Form.Control.Feedback>
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
                      isInvalid={!!errors.address}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.address}
                    </Form.Control.Feedback>
                  </Form.Group>
                  </Col>
              </Row>

              <Button variant="primary" type="submit" className="w-100 sub_btn">
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
