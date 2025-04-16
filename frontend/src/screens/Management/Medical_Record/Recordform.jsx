import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../../styles/Record.css";
const Addrecords = () => {
    const initialRecordState = {
        fullName: "",
        dob: "",
        age: "",
        gender: "",
        address: "",
        contactNumber: "",
        email: "",
        emergencyContact: "",
        maritalStatus: "",
        occupation: "",
        nationality: "",
        familymember:"",
        condition:"",
        pastcondition:"",
        surgery:"",
        
        currentmedicine:"",
        drugName:"",
        dosage:"",
        allergies:"",
        smokingHabits:"",
        pregnancies:"",
        menstrualHistory:"",
        treatment: "",
        startDate:"",
        prescribingDoctor:"",
        
    };

    const [record, setRecord] = useState(initialRecordState);
    const navigate = useNavigate();

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setRecord({
            ...record,
            [name]: value,
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        
        // Assuming you have the user ID available, e.g., from a user context or state
        const userId = "user_id_here"; // Replace this with the actual user ID
    
        // Add the user ID to the record object
        const recordWithUserId = { ...record, user: userId }; // Spread the existing record and add the user ID
    
        console.log(recordWithUserId);  // Check the data structure here
        
        try {
            const response = await axios.post("http://localhost:5000/api/rcreate", recordWithUserId);
            alert(response.data.msg);
            navigate("/recordshow"); // Adjust the route according to your setup
        } catch (error) {
            console.error("Error details:", error.response ? error.response.data : error.message);
            alert("Error creating record: " + (error.response?.data?.msg || error.message));
        }
    };

    

    

    return (
        <Container className='addRecord'>
            <Link to="/recordshow">
                <Button variant="secondary" className="mb-3">Back</Button>
            </Link>

            <h3>Demographic Information</h3>
            <Form className="addRecordForm" onSubmit={submitForm}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="fullName">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={inputChangeHandler} 
                                name="fullName" 
                                placeholder="Enter full name" 
                                value={record.fullName} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="dob">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control 
                                type="date" 
                                onChange={inputChangeHandler} 
                                name="dob" 
                                value={record.dob} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control 
                                type="number" 
                                onChange={inputChangeHandler} 
                                name="age" 
                                placeholder="Enter age" 
                                value={record.age} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="gender">
                            <Form.Label>Gender</Form.Label>
                            <Form.Control 
                                as="select" 
                                onChange={inputChangeHandler} 
                                name="gender" 
                                value={record.gender}
                                autoComplete="off"
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="address">
                            <Form.Label>Address</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={inputChangeHandler} 
                                name="address" 
                                placeholder="Enter address" 
                                value={record.address} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="contactNumber">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control 
                                type="number" 
                                onChange={inputChangeHandler} 
                                name="contactNumber" 
                                placeholder="Enter contact number" 
                                value={record.contactNumber} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control 
                                type="email" 
                                onChange={inputChangeHandler} 
                                name="email" 
                                placeholder="Enter email" 
                                value={record.email} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="emergencyContact">
                            <Form.Label>Emergency Contact</Form.Label>
                            <Form.Control 
                                type="number" 
                                onChange={inputChangeHandler} 
                                name="emergencyContact" 
                                placeholder="Enter emergency contact number" 
                                value={record.emergencyContact} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="maritalStatus">
                            <Form.Label>Marital Status</Form.Label>
                            <Form.Control 
                                as="select" 
                                onChange={inputChangeHandler} 
                                name="maritalStatus" 
                                value={record.maritalStatus}
                                autoComplete="off"
                            >
                                <option value="">Select Marital Status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                                <option value="Widowed">Widowed</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="occupation">
                            <Form.Label>Occupation</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={inputChangeHandler} 
                                name="occupation" 
                                placeholder="Enter occupation" 
                                value={record.occupation} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="nationality">
                            <Form.Label>Nationality</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={inputChangeHandler} 
                                name="nationality" 
                                placeholder="Enter nationality" 
                                value={record.nationality} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                    <h3>Medical History</h3>
                    
                    <Col md={6}>
                        <Form.Group controlId="familymember">
                            <Form.Label>Family Members</Form.Label>
                            <Form.Control 
                                as="select" 
                                onChange={inputChangeHandler} 
                                name="familymember" 
                                value={record.familymember}
                                autoComplete="off"
                            >
                                <option value="">Select family member</option>
                                <option value="Father">Father</option>
                                <option value="Mother">Mother</option>
                                <option value="Sibling">Sibling</option>
                                <option value="Spouse">Spouse</option>
                                <option value="Child">Child</option>
                                <option value="Other">Other</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="condition">
                            <Form.Label>Condition</Form.Label>
                            <Form.Control 
                                as="select" 
                                onChange={inputChangeHandler} 
                                name="condition" 
                                value={record.condition}
                                autoComplete="off"
                            >
                                <option value="">Select Condition</option>
                                <option value="Heart disease">Heart disease</option>
                                <option value="Diabetes">Diabetes</option>
                                <option value="Cancer">Cancer</option>
                                <option value="Hypertension">Hypertension</option>
                                <option value="Other genetic conditions">Other genetic conditions</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="pastcondition">
                            <Form.Label>Past Conditions</Form.Label>
                            <Form.Control 
                                as="select" 
                                onChange={inputChangeHandler} 
                                name="pastcondition" 
                                value={record.pastcondition}
                                autoComplete="off"
                            >
                                <option value="">Select Condition</option>
                                <option value="Chronic Conditions (e.g., asthma, diabetes, hypertension)">Chronic Conditions</option>
                                <option value="Major illnesses (e.g., pneumonia, tuberculosis)">Major illnesses</option>
                                <option value="Mental health conditions (e.g., depression, anxiety)">Mental health conditions</option>
                                <option value="Past injuries (e.g., broken bones, trauma)">Past injuries</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="surgery">
                            <Form.Label>Surgery</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={inputChangeHandler} 
                                name="surgery" 
                                placeholder="Enter surgery details" 
                                value={record.surgery} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>

                    
                    <h3>Treatments</h3>
                    <Col md={6}>
                        <Form.Group controlId="currentmedicine">
                            <Form.Label>Current Medicines</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={inputChangeHandler} 
                                name="currentmedicine" 
                                placeholder="Enter current medicines" 
                                value={record.currentmedicine} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="drugName">
                            <Form.Label>Drug Name</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={inputChangeHandler} 
                                name="drugName" 
                                placeholder="Enter drug name" 
                                value={record.drugName} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="dosage">
                            <Form.Label>Dosage</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={inputChangeHandler} 
                                name="dosage" 
                                placeholder="Enter dosage" 
                                value={record.dosage} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="allergies">
                            <Form.Label>Allergies</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={inputChangeHandler} 
                                name="allergies" 
                                placeholder="Enter allergies" 
                                value={record.allergies} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="smokingHabits">
                            <Form.Label>Smoking Habits</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={inputChangeHandler} 
                                name="smokingHabits" 
                                placeholder="Enter smoking habits" 
                                value={record.smokingHabits} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="pregnancies">
                            <Form.Label>Pregnancies</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={inputChangeHandler} 
                                name="pregnancies" 
                                placeholder="Enter pregnancies" 
                                value={record.pregnancies} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="menstrualHistory">
                            <Form.Label>Menstrual History</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={inputChangeHandler} 
                                name="menstrualHistory" 
                                placeholder="Enter menstrual history" 
                                value={record.menstrualHistory} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="treatment">
                            <Form.Label>Treatment</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={inputChangeHandler} 
                                name="treatment" 
                                placeholder="Enter treatment details" 
                                value={record.treatment} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="startDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control 
                                type="date" 
                                onChange={inputChangeHandler} 
                                name="startDate" 
                                value={record.startDate} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="prescribingDoctor">
                            <Form.Label>Prescribing Doctor</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={inputChangeHandler} 
                                name="prescribingDoctor" 
                                placeholder="Enter prescribing doctor’s name" 
                                value={record.prescribingDoctor} 
                                autoComplete="off"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </Container>
    );
};

export default Addrecords;