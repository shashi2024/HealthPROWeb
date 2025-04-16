import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {
  // Common fields
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  // Patient-specific fields
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  // Management-specific fields
  const [section, setSection] = useState(""); // Initialize with empty string
  const [startDate, setStartDate] = useState("");
  const [managementPhone, setManagementPhone] = useState("");
  const [location, setLocation] = useState("");

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  // Initialize fields based on user info when the component loads
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setRole(userInfo.role);

      // If the user is a patient, load patient-specific details
      if (userInfo.role === "Patient" && userInfo.patientDetails) {
        // Format the dob to YYYY-MM-DD
        const dobDate = userInfo.patientDetails.dob
          ? new Date(userInfo.patientDetails.dob)
          : null;
        setDob(dobDate ? dobDate.toISOString().split("T")[0] : "");
        setPhone(userInfo.patientDetails.phone);
        setEmergencyContact(userInfo.patientDetails.emergencyContact);
      }

      // If the user is in management, load management-specific details
      else if (userInfo.role === "Management" && userInfo.managementDetails) {
        setSection(userInfo.managementDetails.section || ""); // Load existing section value, default to empty string if undefined
        const stDate = userInfo.managementDetails.startDate
          ? new Date(userInfo.managementDetails.startDate)
          : null;
        setStartDate(stDate ? stDate.toISOString().split("T")[0] : "");
        setManagementPhone(userInfo.managementDetails.phone);
        setLocation(userInfo.managementDetails.location);
      }
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        style: {
          backgroundColor: "#ffd5cc",
          color: "black",
          fontSize: "16px",
          fontWeight: "bold",
          fontFamily: "monospace",
        },
      });
    } else {
      try {
        const updateData = {
          _id: userInfo._id,
          name,
          email,
          password,
        };

        // Add patient details if the user is a patient
        if (role === "Patient") {
          updateData.patientDetails = {
            dob,
            phone,
            emergencyContact,
          };
        }

        // Add management details if the user is in management
        if (role === "Management") {
          updateData.managementDetails = {
            section,
            startDate,
            phone: managementPhone,
            location,
          };
        }

        const res = await updateProfile(updateData).unwrap();
        console.log(res);
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          style: {
            backgroundColor: "#a9dcf9",
            color: "black",
            fontSize: "18px",
            fontWeight: "bold",
            fontFamily: "monospace",
          },
        });
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Update Profile</h1>
      <Form onSubmit={submitHandler}>
        <Row>
          {/* Common fields */}
          <Col md={6}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="my-2" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Col>

          {/* Role display (no option to change) */}
          <Col md={6}>
            <Form.Group className="my-2" controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Control type="text" value={role} readOnly></Form.Control>
            </Form.Group>
          </Col>

          {/* Conditional fields based on role */}
          {role === "Patient" && (
            <>
              <Col md={6}>
                <Form.Group className="my-2" controlId="dob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="my-2" controlId="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="my-2" controlId="emergencyContact">
                  <Form.Label>Emergency Contact</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter emergency contact"
                    value={emergencyContact}
                    onChange={(e) => setEmergencyContact(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </>
          )}

          {role === "Management" && (
            <>
              <Col md={6}>
                <Form.Group className="my-2" controlId="section">
                  <Form.Label>Section</Form.Label>
                  <Form.Select
                    value={section} // Ensure it displays the current value
                    onChange={(e) => setSection(e.target.value)}
                    required
                  >
                    <option value="">Select section</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Staff Handling">Staff Handling</option>
                    <option value="Patient Reporting">Patient Reporting</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="my-2" controlId="startDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="my-2" controlId="managementPhone">
                  <Form.Label>Management Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter management phone number"
                    value={managementPhone}
                    onChange={(e) => setManagementPhone(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group className="my-2" controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </>
          )}
        </Row>

        <Button type="submit" variant="danger" className="my-3">
          {isLoading ? <Loader /> : "Update Profile"}
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
