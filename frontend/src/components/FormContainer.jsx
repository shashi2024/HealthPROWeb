import { Container, Row, Col } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center" style={{ marginTop: "-20px" }}>
        <Col
          xs={12}
          md={6}
          className="card p-5"
          style={{
            borderRadius: "25px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
