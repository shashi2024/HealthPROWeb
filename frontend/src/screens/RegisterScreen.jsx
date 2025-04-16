import { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Patient");
  const [patientDetails, setPatientDetails] = useState({
    dob: "",
    phone: "",
    emergencyContact: "",
  });
  const [managementDetails, setManagementDetails] = useState({
    section: "",
    startDate: "",
    phone: "",
    location: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const registrationData = {
          name,
          email,
          password,
          role,
          ...(role === "Patient" && { patientDetails }),
          ...(role === "Management" && { managementDetails }),
        };

        const res = await register(registrationData).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("Registration successful", {
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

        // Role-specific notifications
        if (role === "Patient") {
          toast.info("Please complete your Medical profile", {
            position: "top-right",
            autoClose: 7000,
            style: {
              backgroundColor: "#ebc7cd",
              color: "black",
              fontSize: "16px",
              fontWeight: "bold",
              fontFamily: "monospace",
            },
          });
        } else if (role === "Management") {
          toast.info("You can access your dashboard panel now", {
            position: "top-right",
            autoClose: 7000,
            style: {
              backgroundColor: "#ebc7cd",
              color: "black",
              fontSize: "16px",
              fontWeight: "bold",
              fontFamily: "monospace",
            },
          });
        }

        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error, {
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
      }
    }
  };

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={6}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group className="my-2" controlId="role">
              <Form.Label>Select Role</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="radio"
                  label="Patient"
                  name="role"
                  value="Patient"
                  checked={role === "Patient"}
                  onChange={(e) => setRole(e.target.value)}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Management"
                  name="role"
                  value="Management"
                  checked={role === "Management"}
                  onChange={(e) => setRole(e.target.value)}
                />
              </div>
            </Form.Group>
          </Col>

          <Col md={6}>
            {/* Patient Role Fields */}
            {role === "Patient" && (
              <>
                <Form.Group className="my-2" controlId="dob">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    value={patientDetails.dob}
                    onChange={(e) =>
                      setPatientDetails({
                        ...patientDetails,
                        dob: e.target.value,
                      })
                    }
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={patientDetails.phone}
                    onChange={(e) =>
                      setPatientDetails({
                        ...patientDetails,
                        phone: e.target.value,
                      })
                    }
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="emergencyContact">
                  <Form.Label>Emergency Contact</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter emergency contact"
                    value={patientDetails.emergencyContact}
                    onChange={(e) =>
                      setPatientDetails({
                        ...patientDetails,
                        emergencyContact: e.target.value,
                      })
                    }
                    required
                  ></Form.Control>
                </Form.Group>
              </>
            )}

            {/* Management Role Fields */}
            {role === "Management" && (
              <>
                <Form.Group className="my-2" controlId="section">
                  <Form.Label>Section</Form.Label>
                  <Form.Select
                    value={managementDetails.section}
                    onChange={(e) =>
                      setManagementDetails({
                        ...managementDetails,
                        section: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Select section</option>
                    <option value="Emergency">Emergency</option>
                    <option value="Staff Handling">Staff Handling</option>
                    <option value="Patient Reporting">Patient Reporting</option>
                    {/* Add more options as needed */}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="my-2" controlId="startDate">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={managementDetails.startDate}
                    onChange={(e) =>
                      setManagementDetails({
                        ...managementDetails,
                        startDate: e.target.value,
                      })
                    }
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter location"
                    value={managementDetails.location}
                    onChange={(e) =>
                      setManagementDetails({
                        ...managementDetails,
                        location: e.target.value,
                      })
                    }
                    required
                  ></Form.Control>
                </Form.Group>

                <Form.Group className="my-2" controlId="phone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={managementDetails.phone}
                    onChange={(e) =>
                      setManagementDetails({
                        ...managementDetails,
                        phone: e.target.value,
                      })
                    }
                    required
                  ></Form.Control>
                </Form.Group>
              </>
            )}
          </Col>
        </Row>

        {isLoading ? (
          <Loader />
        ) : (
          <Button type="submit" variant="danger" className="mt-3">
            Register
          </Button>
        )}
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account?{" "}
          <Link
            to={`/login`}
            style={{
              textDecoration: "none",
              color: "grey",
              fontWeight: "Bolder",
            }}
          >
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
