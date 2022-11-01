//Joshua Payne
import React from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import NavDropdown from "react-bootstrap/NavDropdown";

function getCookie(name) {
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
}

function handleSubmit(e) {
  e.preventDefault();
  const csrftoken = getCookie("csrftoken");
  const postData = async () => {
    const response = await axios.post(
      "/api/time_availability/",
      {
        csrfmiddlewaretoken: "abc",
        day: "1",
        time: "01:01:00",
      },
      {
        headers: {
          // Overwrite Axios's automatically set Content-Type
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
      }
    );
    console.log(response);
  };
  postData().catch((err) => {
    console.log(err);
  });
}

function Survey() {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="/">
            <h2 style={{ color: "#cfae70" }}>Profile</h2>
          </Navbar.Brand>
          <Nav
            className="me-auto"
            style={{ fontWeight: "bold", color: "purple" }}
          >
            <Nav.Link href="/profile">My Orgs</Nav.Link>
            <NavDropdown title="Fill a Survey" id="basic-nav-dropdown">
              <NavDropdown.Item href="/survey">Mentor Survey</NavDropdown.Item>
              <NavDropdown.Item href="/survey">Mentee Survey</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">
                Day in the Life of a Lifer
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/about">Club Information</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button href="/signin" variant="outline-warning">
              Sign Out
            </Button>
          </Form>
        </Container>
      </Navbar>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-6 col-xl-5">
            <form
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
              onSubmit={handleSubmit}
            >
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Mentor Survey</h3>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email Address"
                  />
                </div>
                <div className="form-outline mb-4">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Select a lifting style</option>
                    <option value="1">Olympic</option>
                    <option value="2">General</option>
                    <option value="3">Power</option>
                  </select>
                </div>
                <div className="form-outline mb-4">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="3">Prefer not to say</option>
                  </select>
                </div>
                <div className="form-outline mb-4">
                  <select
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option selected>Number of mentees preferred</option>
                    <option value="1">1</option>
                    <option value="2">2 or more</option>
                  </select>
                </div>
                <button
                  className="btn btn-outline-primary btn-block"
                  id="submitBtn"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Survey;
