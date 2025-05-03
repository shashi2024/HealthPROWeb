import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Container, Button, Card, Row, Col } from "react-bootstrap";
import "../../../styles/Recordshow.css";
import jsPDF from "jspdf";

const Recordshow = () => {
    const [record, setRecord] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRecord = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/rgetone/${id}`);
                setRecord(data);
            } catch (error) {
                console.error("Error fetching record:", error);
                alert("Error fetching record: " + (error.response?.data?.msg || error.message));
            }
        };
        fetchRecord();
    }, [id]);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        return new Date(dateString).toISOString().split('T')[0];
    };

    if (!record) {
        return <div>Loading...</div>;
    }

    // Function to delete a record
    const deleteRecord = async (recordId) => {
        try {
            await axios.delete(`http://localhost:5000/api/rdelete/${recordId}`);
            alert("Record deleted successfully.");
            navigate("/managementdashboard/reports"); // Auto navigate to reports page
        } catch (error) {
            console.error("Error deleting record:", error);
            alert("Error deleting record. Please try again.");
        }
    };

    const generatePDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Medical Record", 14, 15);

        doc.setFontSize(12);
        let y = 30;
        const addField = (label, value) => {
            doc.text(`${label}: ${value || ""}`, 14, y);
            y += 8;
        };

        addField("Full Name", record.fullName);
        addField("Date of Birth", record.dob);
        addField("Age", record.age);
        addField("Gender", record.gender);
        addField("Address", record.address);
        addField("Contact Number", record.contactNumber);
        addField("Email", record.email);
        addField("Emergency Contact", record.emergencyContact);
        addField("Marital Status", record.maritalStatus);
        addField("Occupation", record.occupation);
        addField("Nationality", record.nationality);
        addField("Family Members", record.familymember);
        addField("Current Condition", record.condition);
        addField("Past Conditions", record.pastcondition);
        addField("Surgery History", record.surgery);
        addField("Current Medicine", record.currentmedicine);
        addField("Drug Name", record.drugName);
        addField("Dosage", record.dosage);
        addField("Allergies", record.allergies);
        addField("Smoking Habits", record.smokingHabits);
        addField("Pregnancies", record.pregnancies);
        addField("Menstrual History", record.menstrualHistory);
        addField("Treatment", record.treatment);
        addField("Start Date", record.startDate);
        addField("Prescribing Doctor", record.prescribingDoctor);

        doc.save(`Medical_Record_${record.fullName || "patient"}.pdf`);
    };

    return (
        <Container className="recordList">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <Link to="/managementdashboard/reports">
                    <Button variant="secondary">Back</Button>
                </Link>
                <div>
                    <Button 
                        variant="primary" 
                        className="me-2"
                        onClick={() => navigate(`/admin/reports/scan/editrecord/${id}`)}
                    >
                        Edit Record
                    </Button>
                </div>
            </div>

            <Card className="report-card">
                <Card.Body>
                    <Card.Title className="report-title">Medical Record</Card.Title>
                    <Card.Text>
                        <Row className="record-row">
                            <Col xs={6}>
                                <strong>Full Name:</strong> {record.fullName}
                            </Col>
                            <Col xs={6}>
                                <strong>Date of Birth:</strong> {formatDate(record.dob)}
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
                                <strong>Start Date:</strong> {formatDate(record.startDate)}
                            </Col>
                        </Row>
                        <Row className="record-row">
                            <Col xs={6}>
                                <strong>Prescribing Doctor:</strong> {record.prescribingDoctor}
                            </Col>
                        </Row>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                    <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                        <Button variant="info" onClick={generatePDF} style={{ flex: 1, height: '48px', fontWeight: 'bold', fontSize: '16px', borderRadius: '8px' }}>
                            Download PDF
                        </Button>
                        <Button variant="danger" onClick={() => deleteRecord(record._id)} style={{ flex: 1, height: '48px', fontWeight: 'bold', fontSize: '16px', borderRadius: '8px' }}>
                            Delete
                        </Button>
                    </div>
                </Card.Footer>
            </Card>
        </Container>
    );
};

export default Recordshow;