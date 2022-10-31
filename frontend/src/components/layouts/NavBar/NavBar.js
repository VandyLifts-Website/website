/* Copyright P. Opiyo @2022 - All rights reserved */
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

function NavBar(props) {
  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">
          <h2 style={{ color: "#cfae70" }}>VandyLifts</h2>
        </Navbar.Brand>
        <Form className="d-flex">
          {props.isLogin && (
            <Link to="/signin" className="btn btn-outline-primary">
              Sign In
            </Link>
          )}
        </Form>
      </Container>
    </Navbar>
  );
}

export default NavBar;