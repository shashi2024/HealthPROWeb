import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar";
import axios from "axios";
import "../../styles/Reports.css";

const Reports = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const { data } = await axios.get("/api/records-with-patient");
        setRecords(data);
      } catch (error) {
        console.error("Error fetching records:", error);
      }
    };
    fetchRecords();
  }, []);

  const handleViewRecords = (patientId) => {
    navigate(`/admin/reports/scan/recordshow/${patientId}`);
  };

  return (
    <Container fluid className="AdminDashboard" style={{ paddingLeft: 0 }}>
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar />
        </Col>
        <Col md={9} style={{ marginLeft: 0, paddingLeft: 0 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2>Medical Records</h2>
            <Button
              style={{
                backgroundColor: '#00bfc8',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                height: '40px',
                width: '120px',
                fontSize: '16px',
                fontWeight: '500',
                marginBottom: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
              onClick={() => navigate("/admin/reports/scan/record-form")}
            >
              Add New
            </Button>
          </div>
          <div className="report_list">
            <Table className="form">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Patient Name</th>
                  
                  <th>Condition</th>
                  
                  <th>Doctor</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {records.length > 0 ? (
                  records.map((record, index) => (
                    <tr key={record._id}>
                      <td>{index + 1}</td>
                      <td>{record.user?.name}</td>
                      
                      <td>{record.condition}</td>
                      
                      <td>{record.prescribingDoctor}</td>
                      <td>
                        <Button
                          className="button"
                          onClick={() => handleViewRecords(record._id)}
                        >
                          View Record
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center no-patients">
                      No records found
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Reports;
