import { useState, useEffect } from "react";
import axios from "axios";
import { Card, Row, Col } from "react-bootstrap";
import jsPDF from "jspdf";

const MedicalRecordScreen = () => {
  const [records, setRecords] = useState([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo")); // or from context
  const userId = userInfo?._id;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
  };

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchMyRecords = async () => {
      try {
        const { data } = await axios.get(`/api/rgetall?user=${userId}`);
        setRecords(data);
      } catch (error) {
        console.error("Error fetching records:", error);
        alert("Error fetching records. Please try again."); // Basic error handling
      }
    };
    if (userId) fetchMyRecords();
  }, [userId]);

  // Function to delete a record

  const generatePDF = (record) => {
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
    addField("Date of Birth", formatDate(record.dob));
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
    addField("Start Date", formatDate(record.startDate));
    addField("Prescribing Doctor", record.prescribingDoctor);
    doc.save(`Medical_Record_${record.fullName || "patient"}.pdf`);
  };

  return (
    <div className="recordList">
      <Row xs={1} md={2} className="g-4">
        {records.slice(-1).map((record) => (
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
                      <strong>Emergency Contact:</strong>{" "}
                      {record.emergencyContact}
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
                      <strong>Current Medicine:</strong>{" "}
                      {record.currentmedicine}
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
                      <strong>Menstrual History:</strong>{" "}
                      {record.menstrualHistory}
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
                      <strong>Prescribing Doctor:</strong>{" "}
                      {record.prescribingDoctor}
                    </Col>
                  </Row>
                </Card.Text>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <button
                  style={{
                    flex: 1,
                    height: '40px',
                    fontWeight: 'bold',
                    fontSize: '15px',
                    borderRadius: '8px',
                    background: '#00bfc8',
                    color: '#fff',
                    border: 'none'
                  }}
                  onClick={() => generatePDF(record)}
                >
                  Download PDF
                </button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MedicalRecordScreen;
