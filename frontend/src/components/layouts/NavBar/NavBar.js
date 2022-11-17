/* Copyright P. Opiyo and Joshua Payne @2022 - All rights reserved */
import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import CSRFTOKEN from "../../../csrftoken";

function NavBar(props) {

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">
          <h2 style={{ color: "#cfae70" }}>VandyLifts</h2>
        </Navbar.Brand>
        {!props.userData.is_logged_in ? (
          <Form
            className="d-flex"
            action="/accounts/google/login/"
            method="post"
          >
            <CSRFTOKEN/>
            <Button variant="outline-dark" type="submit">
              Sign In
            </Button>
          </Form>
        ) : (
          <>
            <Nav
              className="me-auto"
              style={{ fontWeight: "bold", color: "purple" }}
            >
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/organizations">Join an Organization</Nav.Link>
              {props.userData.is_admin && (<Nav.Link href="/organizer">Organizer</Nav.Link>)}
              <Nav.Link href="/about">Club Information</Nav.Link>
            </Nav>
            <Form className="d-flex" action="/accounts/logout/" method="post">
              <CSRFTOKEN credentials="include"/>
              <Button variant="outline-dark" type="submit">
                Sign Out
              </Button>
            </Form>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
