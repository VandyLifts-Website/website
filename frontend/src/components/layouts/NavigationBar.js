import React from "react";
// import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function NavigationBar() {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="#home">VandyLifts</Navbar.Brand>
        <Form className="d-flex">
          <Button variant="outline-success">Sign In</Button>
          <Button className="ms-2" variant="outline-primary">
            Register
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
