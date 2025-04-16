import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  FaTachometerAlt,
  FaUser,
  FaCalendarCheck,
  FaUserMd,
  FaDollarSign,
  FaHeartbeat,
  FaFileMedical,
} from "react-icons/fa";
import "../styles/AdminDashboardSideNavbar.css";

const AdminDashboardSideNavbar = () => {
  return (
    <div className="admin-dashboard">
      <h4 className="text-center">Admin Dashboard</h4>
      <Nav className="flex-column">
        <LinkContainer to="/managementdashboard/overview">
          <Nav.Link>
            <FaTachometerAlt /> Overview
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/managementdashboard/patients">
          <Nav.Link>
            <FaUser /> Patients
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/getAllAppointmentsAdmin">
          <Nav.Link>
            <FaCalendarCheck /> Appointments
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/doctors">
          <Nav.Link>
            <FaUserMd /> Doctors
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/managementdashboard/payments">
          <Nav.Link>
            <FaDollarSign /> Payments
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/managementdashboard/emergency">
          <Nav.Link>
            <FaHeartbeat /> Emergency
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/managementdashboard/reports">
          <Nav.Link>
            <FaFileMedical /> Medical Reports
          </Nav.Link>
        </LinkContainer>
        <LinkContainer to="/managementdashboard/ambulances">
          <Nav.Link>
            <FaFileMedical /> Ambulances
          </Nav.Link>
        </LinkContainer>
      </Nav>
    </div>
  );
};

export default AdminDashboardSideNavbar;
