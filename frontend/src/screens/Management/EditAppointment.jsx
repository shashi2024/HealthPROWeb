import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa'; 
import { Container, Row, Col, Table, InputGroup, FormControl } from 'react-bootstrap';
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar";
import "../../styles/Appointments.css"; // Assuming you have a styles file like Doctors.css

function EditAppointment() {
    const [appointments, setAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:3000/api/appointments/getall"); // Fetch all appointments
            setAppointments(response.data);
        };

        fetchData();
    }, []);

   

    const filteredAppointments = appointments.filter((appointment) => {
        return (
            appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <Container fluid className="AppointmentDashboard">
            <Row>
                <Col md={3}>
                    <AdminDashboardSideNavbar />
                </Col>
                <Col md={9}>
                    <div className="appointment_list"> 
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            {/* Right-side search bar */}
                            <InputGroup className="mb-3" style={{ width: '400px' }}>
                                <FormControl
                                    placeholder="Search by Patient or Doctor Name"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <InputGroup.Text>
                                    <FaSearch />
                                </InputGroup.Text>
                            </InputGroup>
                        </div>

                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Patient Name</th>
                                    <th>Age</th>
                                    <th>Doctor</th>
                                    <th>Specialization</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                   
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAppointments.map((appointment) => (
                                    <tr key={appointment._id}>
                                        <td>{appointment.patientName}</td>
                                        <td>{appointment.age}</td>
                                        <td>{appointment.doctorName}</td>
                                        <td>{appointment.specialization}</td>
                                        <td>{new Date(appointment.date).toLocaleDateString()}</td>
                                        <td>{appointment.time}</td>
                                       
                                        <td>
                                            <Link to={'/viewappointment/' + appointment._id} className="btn btn-info btn-sm">View</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default EditAppointment;
