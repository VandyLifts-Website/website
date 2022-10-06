import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import profilePic from "../../pics/profile_pic.jfif";

function Profile() {
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
            <Nav.Link href="#home">My Orgs</Nav.Link>
            <Nav.Link href="#features">Join an Org</Nav.Link>
            <Nav.Link href="#pricing">Learn Lifting</Nav.Link>
            <Nav.Link href="#pricing">Club Information</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button variant="outline-warning">Sign Out</Button>
          </Form>
        </Container>
      </Navbar>
      <section className="profile h-100 gradient-custom-2">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-sm-9 col-xl-7">
              <div className="card">
                <div
                  className="rounded-top text-white d-flex flex-row"
                  style={{ backgroundColor: "#000", height: "200px" }}
                >
                  <div
                    className="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px" }}
                  >
                    <img src={profilePic} alt="My profile" />
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <h5>John Doe</h5>
                    <p>john.doe@vanderbilt.edu</p>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-1 mt-3">
                    <p className="lead fw-normal">
                      <h3>Matches</h3>
                    </p>
                    <div
                      className="rounded card-body"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div className="row">
                        <label className="col-3 fw-bold">Mentor 1:</label>
                        <p className="col-6">Bill Doe</p>
                      </div>
                      <div className="row">
                        <label className="col-3 fw-bold">Mentor 2:</label>
                        <p className="col-4">Jill Doe</p>
                      </div>
                    </div>
                  </div>
                  <div className="row g-2">
                    <div className="d-flex justify-content-between mt-3">
                      <p className="lead fw-bold mb-0">
                        Available Times and Style
                      </p>
                    </div>
                    <div
                      className="rounded card-body"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div className="row">
                        <label className="col-3 fw-bold">Lifting Style:</label>
                        <p className="col-6">Olympic</p>
                      </div>
                      <div className="row">
                        <label className="col-3 fw-bold">Lifting Days:</label>
                        <p className="col-4">Mon, Wed, Fri</p>
                      </div>
                      <div className="row">
                        <label className="col-3 fw-bold">Lifting Time:</label>
                        <p className="col-4">4:00PM-5:00PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
