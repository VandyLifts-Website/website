//Joshua Payne
import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Table from "react-bootstrap/Table";

function Mentee() {
  // const [state, setState] = useState([[false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false],
  //   [false, false, false, false, false, false, false]]);

  const [isActive, setIsActive] = useState(false);

  const handleClick = (event) => {
    console.log(event);
    event.preventDefault();
    event.stopPropagation();
  };

  const handleChange = () => {
    setIsActive((current) => !current);
  };

  return (
    <>
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
            <NavDropdown title="Fill a Survey" id="basic-nav-dropdown">
              <NavDropdown.Item href="/survey/mentor">
                Mentor Survey
              </NavDropdown.Item>
              <NavDropdown.Item href="/survey/mentee">
                Mentee Survey
              </NavDropdown.Item>
              <NavDropdown.Item href="/survey/buddy">
                Buddy Survey
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
              action="/survey"
              method="post"
            >
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Mentee Survey</h3>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    name="first_name"
                    id="first_name"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    id="last_name"
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    className="form-control"
                    name="primary_email"
                    id="primary_email"
                    placeholder="Email Address"
                  />
                </div>
                <Form>
                  <Form.Group className="mb-4">
                    <Form.Select aria-label="Default select example">
                      <option>Sex</option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </Form.Select>
                    <Form.Check
                      type="switch"
                      id="custom-switch"
                      label="Match Sex?"
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Select aria-label="Default select example">
                      <option>Preferred Lifting Style</option>
                      <option value="1">Olympic</option>
                      <option value="2">Powerlifting</option>
                      <option value="2">General Fitness</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label>Availability</Form.Label>
                    <Table striped bordered hover>
                      <thead>
                        <tr>
                          <th>M</th>
                          <th>T</th>
                          <th>W</th>
                          <th>R</th>
                          <th>F</th>
                          <th>S</th>
                          <th>S</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr onClick={(event) => handleClick(event)}>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td
                              key={index}
                              style={{
                                backgroundColor: isActive ? "salmon" : "",
                                color: isActive ? "white" : "",
                              }}
                              onClick={handleChange}
                            >
                              7:00{" "}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td key={index}>8:00 </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td key={index}>9:00 </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td key={index}>10:00 </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td key={index}>11:00 </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td key={index}>12:00 </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td key={index}>13:00 </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td key={index}>14:00 </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td key={index}>15:00 </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td key={index}>16:00 </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td key={index}>17:00 </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td key={index}>18:00 </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td key={index}>19:00 </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td key={index}>20:00 </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td key={index}>21:00 </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td key={index}>22:00 </td>
                          ))}
                        </tr>
                      </tbody>
                    </Table>
                  </Form.Group>
                </Form>
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
export default Mentee;
