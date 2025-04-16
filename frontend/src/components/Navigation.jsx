import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import "../styles/Navigation.css";
import { LinkContainer } from "react-router-bootstrap";

const Navigation = () => {
  return (
    <header>
      <Navbar bg="transparent" expand="lg" className="second">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {/* Home screen */}
            <LinkContainer to="/">
              <Nav.Link href="#home">Home</Nav.Link>
            </LinkContainer>

            {/* About section */}
            <Nav.Link href="#about">About</Nav.Link>

            {/* Main services */}
            <NavDropdown title="Services" id="services-dropdown">
              {/* Appointments */}
              <LinkContainer to="/getAllAppointments">
                <NavDropdown.Item href="#services">
                  Appointments
                </NavDropdown.Item>
              </LinkContainer>

              {/* Medical Reports */}
              <LinkContainer to="/medicalrecord">
                <NavDropdown.Item href="#services">
                  Medical Reports
                </NavDropdown.Item>
              </LinkContainer>

              {/* Emergency Requests */}
              <LinkContainer to="/emergencyrequest">
                <NavDropdown.Item href="#services">
                  Emergency Request
                </NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>

            {/* Features */}
            <Nav.Link href="#features">Features</Nav.Link>

            {/* Doctors screen */}
            <Nav.Link href="#doctors">Doctors</Nav.Link>

            {/* Contact Section */}
            <Nav.Link href="#contact">Contact</Nav.Link>

            <LinkContainer to="/pandemic">
              <Nav.Link href="#pandemic">pandemic</Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
};

export default Navigation;
