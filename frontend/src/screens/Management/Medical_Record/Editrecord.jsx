import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from "react-toastify"; // Ensure you import toast for notifications
import "../../../styles/Record.css";
const Editrecord = () => {
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
    
    const { id } = useParams();
    const [record, setRecord] = useState(initialRecordState); // Use initialRecordState here
    const navigate = useNavigate();

    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setRecord({
            ...record,
            [name]: value,
        });
    };

    useEffect(() => {
        axios.get(`http://localhost:5000/api/rgetone/${id}`)
            .then((response) => {
                setRecord(response.data); // Use setRecord to update the state
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    const submitForm = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/api/rupdate/${id}`, record)
            .then((response) => {
                toast.success(response.data.msg, { position: "top-right" });
                navigate("/recordshow");
            }).catch(error => console.log(error));
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
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="contactNumber">
                            <Form.Label>Contact Number</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={inputChangeHandler} 
                                name="contactNumber" 
                                placeholder="Enter contact number" 
                                value={record.contactNumber} 
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
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="emergencyContact">
                            <Form.Label>Emergency Contact</Form.Label>
                            <Form.Control 
                                type="text" 
                                onChange={inputChangeHandler} 
                                name="emergencyContact" 
                                placeholder="Enter emergency contact number" 
                                value={record.emergencyContact} 
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
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
    <Form.Group controlId="allergies">
        <Form.Label>Allergies</Form.Label>
        <Form.Control 
            as="select" 
            onChange={inputChangeHandler} 
            name="allergies" 
            value={record.allergies}
        >
            <option value="">Select Allergy Type</option>
            <option value="Drug allergy">Drug allergy</option>
            <option value="Food allergy">Food allergy</option>
            <option value="Environmental allergy">Environmental allergy</option>
        </Form.Control>
    </Form.Group>
</Col>


<Col md={6}>
    <Form.Group controlId="smokingHabits">
        <Form.Label>Smoking Habits</Form.Label>
        <Form.Control 
            as="select" 
            onChange={inputChangeHandler} 
            name="smokingHabits" 
            value={record.smokingHabits}
        >
            <option value="">Select Habits</option>
            <option value="Non-smoker">Non-smoker</option>
            <option value="Former smoker">Former smoker</option>
            <option value="Current smoker">Current smoker</option>
        </Form.Control>
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
                                placeholder="Enter pregnancy history" 
                                value={record.pregnancies} 
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
                                placeholder="Enter doctor's name" 
                                value={record.prescribingDoctor} 
                            />
                        </Form.Group>
                    </Col>

                    
                </Row>

                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </Container>
    );
};

export default Editrecord;
