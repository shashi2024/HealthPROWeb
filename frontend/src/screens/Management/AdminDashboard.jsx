import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/AdminDashboard.css";
import AdminDashboardSideNavbar from "../../components/AdminDashboardSideNavbar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <Container fluid className="AdminDashboard">
      <Row>
        {/* Sidebar: Hidden on extra small and small screens, visible on medium and larger */}
        <Col xs={12} md={3} className="d-none d-md-block">
          <AdminDashboardSideNavbar />
        </Col>

        {/* Main Content: Takes full width on small screens */}
        <Col xs={12} md={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
