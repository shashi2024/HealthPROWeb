import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import "../../../styles/Recordshow.css";

const Record = () => {
    const [records, setRecords] = useState([]);

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/rgetall`);
                setRecords(response.data); // Corrected here
            } catch (error) {
                console.error("Error fetching records:", error);
                alert("Error fetching records. Please try again."); // Basic error handling
            }
        };

        fetchData();
    }, []);

    // Function to delete a record
    const deleteRecord = async (recordId) => {
        try {
            await axios.delete(`http://localhost:5000/api/rdelete/${recordId}`);
            setRecords((prevRecords) => prevRecords.filter((record) => record._id !== recordId));
            alert("Record deleted successfully."); // Basic feedback
        } catch (error) {
            console.error("Error deleting record:", error);
            alert("Error deleting record. Please try again."); // Basic error handling
        }
    };

    
    return (
        <div className='recordList'>
            <Link to={"/admin/reports/scan/record-form"} className='btn btn-primary mb-3'>Add New</Link>

            
            <Row xs={1} md={2} className="g-4">
                {records.map((record) => (
                    <Col key={record._id}>
                        <Card className="report-card h-100">
                            <Card.Body>
                                <Card.Title className="report-title">Medical Record</Card.Title>
                                <Card.Text>
                                    <Row className="record-row">
                                        <Col xs={6}>
                                            <strong>Full Name:</strong> {record.fullName}
                                        </Col>
                                        <Col xs={6}>
                                            <strong>Date of Birth:</strong>{record.dob}
                                        </Col>
                                    </Row>
                                    <Row className="record-row">
                                        <Col xs={6}>
                                            <strong>Age:</strong> {record.age}
                                        </Col>
                                        <Col xs={6}>
                                            <strong>Gender:</strong> {record.gender}
                                        </Col>
                                    </Row>
                                    <Row className="record-row">
                                        <Col xs={6}>
                                            <strong>Address:</strong> {record.address}
                                        </Col>
                                        <Col xs={6}>
                                            <strong>Contact Number:</strong> {record.contactNumber}
                                        </Col>
                                    </Row>
                                    <Row className="record-row">
                                        <Col xs={6}>
                                            <strong>Email:</strong> {record.email}
                                        </Col>
                                        <Col xs={6}>
                                            <strong>Emergency Contact:</strong> {record.emergencyContact}
                                        </Col>
                                    </Row>
                                    <Row className="record-row">
                                        <Col xs={6}>
                                            <strong>Marital Status:</strong> {record.maritalStatus}
                                        </Col>
                                        <Col xs={6}>
                                            <strong>Occupation:</strong> {record.occupation}
                                        </Col>
                                       
                                    </Row>
                                    <Row className="record-row">
                                        <Col xs={6}>
                                            <strong>Nationality:</strong> {record.nationality}
                                        </Col>
                                        <Col xs={6}>
                                            <strong>Family Members:</strong> {record.familymember}
                                        </Col>
                                    </Row>
                                    <Row className="record-row">
                                        <Col xs={6}>
                                            <strong>Current Condition:</strong> {record.condition}
                                        </Col>
                                        <Col xs={6}>
                                            <strong>Past Conditions:</strong> {record.pastcondition}
                                        </Col>
                                    </Row>
                                    <Row className="record-row">
                                        <Col xs={6}>
                                            <strong>Surgery History:</strong> {record.surgery}
                                        </Col>
                                        <Col xs={6}>
                                            <strong>Current Medicine:</strong> {record.currentmedicine}
                                        </Col>
                                    </Row>
                                    <Row className="record-row">
                                        <Col xs={6}>
                                            <strong>Drug Name:</strong> {record.drugName}
                                        </Col>
                                        <Col xs={6}>
                                            <strong>Dosage:</strong> {record.dosage}
                                        </Col>
                                    </Row>
                                    <Row className="record-row">
                                        <Col xs={6}>
                                            <strong>Allergies:</strong> {record.allergies}
                                        </Col>
                                        <Col xs={6}>
                                            <strong>Smoking Habits:</strong> {record.smokingHabits}
                                        </Col>
                                    </Row>
                                    <Row className="record-row">
                                        <Col xs={6}>
                                            <strong>Pregnancies:</strong> {record.pregnancies}
                                        </Col>
                                        <Col xs={6}>
                                            <strong>Menstrual History:</strong> {record.menstrualHistory}
                                        </Col>
                                    </Row>
                                    <Row className="record-row">
                                        <Col xs={6}>
                                            <strong>Treatment:</strong> {record.treatment}
                                        </Col>
                                        <Col xs={6}>
                                            <strong>Start Date:</strong> {record.startDate}
                                        </Col>
                                    </Row>
                                    <Row className="record-row">
                                        <Col xs={6}>
                                            <strong>Prescribing Doctor:</strong> {record.prescribingDoctor}
                                        </Col>
                                    </Row>
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="d-flex justify-content-between">
                                <Link to={'/updaterecord/' + record._id}>
                                    <Button variant="warning">Update</Button>
                                </Link>
                                <Button variant="danger" onClick={() => deleteRecord(record._id)}>Delete</Button>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
                
            </Row>
        </div>
    );
};

export default Record;