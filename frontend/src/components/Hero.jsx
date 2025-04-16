import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import "../styles/hero.css";

import hero from "../images/register/registercover.jpg";
import section2 from "../images/home/section2.jpg";
import section3 from "../images/home/section3.jpg";

import doc1 from "../images/home/doc1.png";
import doc2 from "../images/home/doc2.png";
import doc3 from "../images/home/doc3.png";
import doc4 from "../images/home/doc4.png";
import doc5 from "../images/home/doc5.png";
import doc6 from "../images/home/doc6.png";

import d1 from "../images/home/d1.jpg";
import d2 from "../images/home/d2.jpg";
import d3 from "../images/home/d3.jpg";
import d4 from "../images/home/d4.jpg";

import doctorIcon from "../images/home/doctor.png";
import equipmentIcon from "../images/home/equipment.png";
import serviceIcon from "../images/home/service.png";
import supportIcon from "../images/home/support.png";
import reportIcon from "../images/home/reportIcon.png";
import emergencyIcon from "../images/home/emergencyIcon.png";
import { useEffect, useState } from "react";

const Hero = () => {
  const [showScroll, setShowScroll] = useState(false); // State to control button visibility

  const handleScroll = () => {
    // Show or hide the button based on scroll position
    if (window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll); // Add scroll event listener
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup listener on unmount
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="text-light py-5 first_container">
        <Container>
          <Row className="align-items-center">
            {/* Left side: Text and Stats */}
            <Col md={6} className="text-center text-md-start">
              <h1 className="heading_title">
                Good Health Is The Root Of All Happiness
              </h1>
              <Row className="mt-4 count_section text-center text-md-start">
                <Col>
                  <h3 className="count">123</h3>
                  <p className="count_name">Professionals</p>
                </Col>
                <Col>
                  <h3 className="count">1234</h3>
                  <p className="count_name">Surgeries</p>
                </Col>
                <Col>
                  <h3 className="count">12345</h3>
                  <p className="count_name">Happy Patients</p>
                </Col>
              </Row>
            </Col>

            {/* Right side: Image */}
            <Col md={6} className="text-center text-md-end">
              <img
                src={hero} // Replace with your image URL
                alt="Doctors or Medical Illustration"
                className="img-fluid"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-5 section2">
        <Container>
          <Row>
            <Col md={6}>
              <img
                src={section2}
                alt="Doctors"
                className="img-fluid section2_img"
              />
            </Col>
            <Col md={6} className="words">
              <h2>Why You Should Trust Us?</h2>
              <p>
                We provide the best healthcare <br />
                solutions with a team of experienced <br />
                doctors who care about your health and well-being.
              </p>
              <div className="ulButton">
                <ul>
                  <li>🩺 Experienced Doctors</li>
                  <li>💉 Advanced Medical Equipment</li>
                  <li>💊 Comprehensive Care</li>
                </ul>
                <Button variant="primary" className="learn_more">
                  Learn More
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Healthcare Solutions Section */}
      <section id="services" className="py-5">
        <Container>
          <h2 className="text-center mb-4">Health Care Solutions</h2>
          <Row>
            {[
              {
                title: "Cardiology",
                description:
                  "Our cardiology department offers comprehensive care for patients with cardiovascular diseases. We use advanced diagnostic tools and therapies to help prevent, diagnose, and treat heart conditions such as coronary artery disease, heart failure, arrhythmias, and more. Your heart health is our top priority.",
                icon: doc1,
              },
              {
                title: "Pulmonology",
                description:
                  "Our pulmonology services focus on the diagnosis and treatment of lung and respiratory disorders. From chronic conditions like asthma and COPD to acute illnesses such as pneumonia, we provide cutting-edge care. Our team ensures you breathe easier with advanced treatments and personalized care.",
                icon: doc2,
              },
              {
                title: "Hematology",
                description:
                  "Our hematology department specializes in blood disorders including anemia, clotting disorders, and cancers of the blood like leukemia. We offer expert diagnostics and treatments, ensuring that each patient receives individualized care based on the latest research and therapies available.",
                icon: doc3,
              },
              {
                title: "Orthopedics",
                description:
                  "Our orthopedic care focuses on the health of bones, joints, and muscles. From sports injuries to arthritis, fractures, and joint replacement surgery, we provide both surgical and non-surgical solutions to help patients regain mobility and live pain-free lives. Your musculoskeletal health is in expert hands.",
                icon: doc4,
              },
              {
                title: "Dental Surgery",
                description:
                  "Our dental surgery services cover a wide range of oral health care solutions. Whether you need wisdom teeth extraction, reconstructive surgery, or cosmetic procedures, we ensure pain-free, high-quality care with a focus on your long-term dental health and aesthetic satisfaction.",
                icon: doc5,
              },
              {
                title: "Laboratory",
                description:
                  "Our state-of-the-art laboratory services provide essential diagnostics, supporting all of our healthcare departments. From routine blood tests to advanced genetic testing, our lab delivers fast and accurate results to help guide your treatment plan and ensure the best outcomes.",
                icon: doc6,
              },
            ].map((solution, idx) => (
              <Col md={4} className="mb-4" key={idx}>
                <Card className="h-100 text-center">
                  <Card.Body>
                    <div className="icon mb-3">
                      <img
                        src={solution.icon}
                        alt={solution.title}
                        style={{
                          width: "50px",
                          height: "50px",
                          marginTop: "20px",
                        }} // Adjust the size as needed
                      />
                    </div>
                    <Card.Title>{solution.title}</Card.Title>
                    <Card.Text>{solution.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section
        id="features"
        className="bg-primary text-light py-5 section3 rounded"
      >
        <Container>
          <Row>
            <Col md={6}>
              <h2 className="sec3_title">Why Choose Us?</h2>
              <p className="sec3_desc">
                Our dedicated team and modern facilities make us your best
                choice for healthcare.
              </p>
              <ul className="icon-list">
                <li className="sup">
                  <img src={doctorIcon} alt="Doctors" className="icon-img" />
                  Qualified Doctors
                </li>
                <li className="sup">
                  <img
                    src={equipmentIcon}
                    alt="Equipment"
                    className="icon-img"
                  />
                  Modern Equipment
                </li>
                <li className="sup">
                  <img src={supportIcon} alt="Service" className="icon-img" />
                  Trusted Service
                </li>
                <li className="sup">
                  <img src={serviceIcon} alt="Support" className="icon-img" />
                  24 Hours Support
                </li>
                <li className="sup">
                  <img src={reportIcon} alt="Care" className="icon-img" />
                  Medical Reports
                </li>
                <li className="sup">
                  <img
                    src={emergencyIcon}
                    alt="Emergency"
                    className="icon-img"
                  />
                  Emergency Services
                </li>
              </ul>
            </Col>
            <Col md={6}>
              <img
                src={section3}
                alt="Why Choose Us"
                className="img-fluid sec3image"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Our Experienced Doctors Section */}
      <section id="doctors" className="py-5">
        <Container>
          <h2 className="text-center mb-4">Our Experienced Doctors</h2>
          <Row>
            {[
              {
                name: "Dr. James Andrew",
                specialty: "Cardiologist",
                icon: d1,
              },
              {
                name: "Dr. Emil Rodriguez",
                specialty: "Pulmonologist",
                icon: d2,
              },
              {
                name: "Dr. Peter Snowitch",
                specialty: "Dentist",
                icon: d3,
              },
              {
                name: "Dr. Michael Patel",
                specialty: "Hematologist",
                icon: d4,
              },
            ].map((doctor, idx) => (
              <Col md={3} className="mb-4" key={idx}>
                <Card className="h-100 text-center">
                  <div className="image mb-3">
                    <img
                      src={doctor.icon}
                      alt={doctor.title}
                      style={{
                        width: "auto",
                        height: "auto",
                        marginTop: "20px",
                      }} // Adjust the size as needed
                    />
                  </div>
                  <Card.Body>
                    <Card.Title>{doctor.name}</Card.Title>
                    <Card.Text>{doctor.specialty}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Appointment Section */}
      <section id="contact" className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">
            Make An Appointment To Visit Our Doctor
          </h2>
          <Row className="justify-content-center">
            <Col md={6} className="mb-4">
              <Card className="text-center p-4 cardbox">
                <h4>Call Us</h4>
                <p className="display-5">+123 456 7890</p>
              </Card>
            </Col>
            <Col md={6} className="mb-4">
              <Card className="text-center p-4 cardbox">
                <h4>Email Us</h4>
                <p className="display-5">healthnet@gmail.com</p>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer Section */}
      <footer className="bg-dark text-light py-5 footer">
        <Container>
          <Row>
            <Col md={4}>
              <h5>Address</h5>
              <p>123 Street, City, Country</p>
            </Col>
            <Col md={4}>
              <h5>Services</h5>
              <ul>
                <li>Cardiology</li>
                <li>Pulmonology</li>
                <li>Dental Surgery</li>
              </ul>
            </Col>
            <Col md={4}>
              <h5>Newsletter</h5>
              <Form>
                <Form.Group controlId="formNewsletterEmail">
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Button variant="primary" className="mt-3">
                  Subscribe
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </footer>

      {/* Back to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          className="back-to-top"
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            fontSize: "18px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 2px 5px rgba(0,0,0,0.3)",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#0056b3")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#007bff")
          }
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default Hero;
