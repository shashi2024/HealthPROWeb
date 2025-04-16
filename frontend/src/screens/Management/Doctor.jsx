import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa"; // Import FontAwesome search icon
import {
  Container,
  Row,
  Col,
  Table,
  InputGroup,
  FormControl,
} from "react-bootstrap"; // Import Bootstrap components
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar"; // Import side navbar
import "../../styles/Doctors.css"; // Ensure styles are applied

function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/doctor/dgetall"
      ); // Fetch all doctors from API
      setDoctors(response.data);
    };

    fetchData();
  }, []);

  // Function to delete a doctor
  const doctorDelete = async (doctorId) => {
    await axios
      .delete(`http://localhost:3000/api/doctor/ddelete/${doctorId}`)
      .then((response) => {
        setDoctors((prevDoctors) =>
          prevDoctors.filter((doctor) => doctor._id !== doctorId)
        );
        toast.success(response.data.msg, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Filter doctors based on the search term
  // const filteredDoctors = doctors.filter((doctor) => {
  //   return (
  //     doctor.doctorname.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  //   );
  // });

  const filteredDoctors = doctors.filter((doctor) => {
    return (
      (doctor?.doctorname ?? '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doctor?.specialization ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  

  return (
    <Container fluid className="DoctorDashboard">
      <Row>
        <Col md={3}>
          <AdminDashboardSideNavbar /> {/* Side navbar component */}
        </Col>
        <Col md={9}>
          <div className="patient_list">
            {" "}
            {/* Added class name patient_list */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              {/* Left-side button */}
              <Link to={"/adddoctors"} className="btn btn-primary">
                Add Doctor
              </Link>

              {/* Right-side search bar */}
              <InputGroup className="mb-3" style={{ width: "400px" }}>
                {" "}
                {/* Increase width here */}
                <FormControl
                  placeholder="Search by Name or Specialization"
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
                  <th>Doctor Name</th>
                  <th>Specialization</th>
                  <th>Slot</th>
                  <th>Date</th>
                  <th>Timings</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor._id}>
                    <td>{doctor.doctorname}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.slot}</td>
                    <td>{new Date(doctor.date).toLocaleDateString()}</td>{" "}
                    {/* Format date */}
                    <td>{doctor.timings}</td>
                    <td>
                      <div>
                        <Link
                          to={"/editdoctors/" + doctor._id}
                          className="btn btn-warning btn-sm"
                        >
                          Update
                        </Link>
                        <button
                          onClick={() => doctorDelete(doctor._id)}
                          className="btn btn-danger btn-sm"
                          style={{ width: "80px", marginLeft: "10px" }}
                        >
                          Delete
                        </button>
                      </div>
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

export default Doctor;
