/* Copyright P. Opiyo @2022 - All rights reserved */
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function NavBar(props) {
  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  const csrftoken = getCookie("csrftoken");

  return (
    <Navbar bg="light" variant="light">
      <Container>
        <Navbar.Brand href="/">
          <h2 style={{ color: "#cfae70" }}>VandyLifts</h2>
        </Navbar.Brand>
        {!props.isLoggedIn ? (
          <Form
            className="d-flex"
            action="/accounts/google/login/"
            method="post"
          >
            <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
            <button type="submit">signin</button>
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
            <Form className="d-flex" action="/accounts/logout/" method="post">
              <input
                type="hidden"
                name="csrfmiddlewaretoken"
                value={csrftoken}
              />
              <button type="submit">Sign Out</button>
            </Form>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default NavBar;
