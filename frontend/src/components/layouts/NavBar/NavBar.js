/* Copyright P. Opiyo @2022 - All rights reserved */
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function NavBar(props) {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">
          <h2 style={{ color: "#cfae70" }}>VandyLifts</h2>
        </Navbar.Brand>
        {!props.isLoggedIn ? (
          <Form className="d-flex">
            <Link to="/signin" className="btn btn-outline-primary">
              Sign In
            </Link>
          </Form>
        ) : (
          <>
            <Nav
              className="me-auto"
              style={{ fontWeight: "bold", color: "purple" }}
            >
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/organizations">Join an Organization</Nav.Link>
              <Nav.Link href="/about">Club Information</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Button href="/signin" variant="outline-warning">
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
