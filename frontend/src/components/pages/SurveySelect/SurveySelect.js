import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/esm/Container";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

function SurveySelect() {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <h2 style={{ color: "#cfae70" }}>VandyLifts</h2>
          </Navbar.Brand>
          <Nav
            className="me-auto"
            style={{ fontWeight: "bold", color: "purple" }}
          >
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/surveys">Join an Org</Nav.Link>
            <Nav.Link href="/about">Club Information</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button href="/signin" variant="outline-warning">
              Sign Out
            </Button>
          </Form>
        </Container>
      </Navbar>

      <div
        className="d-grid gap-2 col-md-6 offset-md-3"
        style={{
          margin: "0",
          position: "absolute",
          top: "50%",
          left: "50%",
          msTransform: "translate(-50%, -50%)",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Button href="/survey/mentor" variant="primary" size="lg">
          Mentor Application
        </Button>
        <Button href="/survey/mentee" variant="primary" size="lg">
          Mentee Application
        </Button>
        <Button href="/survey/buddy" variant="primary" size="lg">
          Buddy Application
        </Button>
      </div>
    </div>
  );
}
export default SurveySelect;
