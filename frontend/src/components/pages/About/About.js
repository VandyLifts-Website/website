/* Copyright P. Opiyo @2022 - All rights reserved */
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import Footer from "../../layouts/Footer/Footer";

function About() {
  return (
    <div
      className="about"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <h2 style={{ color: "#cfae70" }}>VandyLifts</h2>
          </Navbar.Brand>
          <Nav
            className="me-auto"
            style={{ fontWeight: "bold", color: "purple" }}
          >
            <Nav.Link href="#home">My Orgs</Nav.Link>
            <Nav.Link href="#features">Join an Org</Nav.Link>
            <Nav.Link href="#pricing">Learn Lifting</Nav.Link>
            <Nav.Link href="#pricing">Club Information</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Link to="/signin" className="btn btn-outline-warning">
              Sign Out
            </Link>
          </Form>
        </Container>
      </Navbar>
      <section
        className="section"
        style={{ paddingTop: "40px", paddingBottom: "40px", flex: "1 0 auto" }}
      >
        <Container>
          <div className="row">
            <div className="col-md-12 text-center">
              <h3
                className="main-heading"
                style={{ fontSize: "2em", color: "#cfae70" }}
              >
                Our Club
              </h3>
              <div
                className="underline mx-auto"
                style={{
                  height: "4px",
                  width: "4rem",
                  marginTop: "5px",
                  marginBottom: "10px",
                  backgroundColor: "#cfae70",
                }}
              />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur nulla ex, faucibus vel justo a, consectetur
                sollicitudin turpis. Nulla leo nulla, volutpat ac mi quis,
                malesuada aliquam sapien. Ut sapien tellus, elementum ac lacus
                vitae, imperdiet dignissim urna. Pellentesque habitant morbi
                tristique senectus et netus et malesuada fames ac turpis
                egestas. Donec id semper lectus. Suspendisse et tempus magna, eu
                egestas dolor. In vehicula turpis et magna vehicula, at egestas
                velit interdum. Etiam volutpat felis ac quam pulvinar, volutpat
                dapibus leo elementum. Aliquam ullamcorper nunc a luctus
                scelerisque. Pellentesque nec hendrerit turpis, eu faucibus
                magna. Aenean venenatis eros sed tellus commodo interdum eget
                nec velit. Aenean et tellus velit. In eu lacus sit amet elit
                facilisis facilisis ut eget elit. Pellentesque dolor enim,
                semper dignissim felis imperdiet, volutpat placerat ante. Nullam
                ut bibendum ex. Aliquam faucibus mauris nec varius elementum.
              </p>
              <h3
                className="main-heading"
                style={{ fontSize: "2em", color: "#cfae70" }}
              >
                Our Mission Statement
              </h3>
              <div
                className="underline mx-auto"
                style={{
                  height: "4px",
                  width: "4rem",
                  marginTop: "5px",
                  marginBottom: "10px",
                  backgroundColor: "#cfae70",
                }}
              />
              <p>
                The purpose of Vandy Lifts is to promote an active and healthy
                lifestyle through helping individuals learn how to lift, help
                others how to lift, or find a workout partner to feel
                comfortable at the Vanderbilt Recreation Center (and gyms at
                home). In addition, Vandy Lifts will teach members how to
                structure their meals to meet their workout needs and fuel their
                bodies.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </div>
  );
}

export default About;
