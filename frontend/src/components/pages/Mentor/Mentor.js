//Joshua Payne
import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import Table from "react-bootstrap/Table";

function Mentor() {
  const [state, setState] = useState([
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
    [false, false, false, false, false, false, false],
  ]);

  const handleClick = (row, col, event) => {
    event.preventDefault();
    let copy = [...state];
    copy[row][col] = true;
    setState(copy);
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
                <h3 className="mb-5">Mentor Survey</h3>
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
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td
                              key={index}
                              style={{
                                backgroundColor: state[0][index]
                                  ? "salmon"
                                  : "",
                                color: state[0][index] ? "white" : "",
                              }}
                              onClick={(event) => handleClick(0, index, event)}
                            >
                              7:00{" "}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td
                              key={index}
                              style={{
                                backgroundColor: state[1][index]
                                  ? "salmon"
                                  : "",
                                color: state[1][index] ? "white" : "",
                              }}
                              onClick={(event) => handleClick(1, index, event)}
                            >
                              8:00{" "}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td
                              key={index}
                              style={{
                                backgroundColor: state[2][index]
                                  ? "salmon"
                                  : "",
                                color: state[2][index] ? "white" : "",
                              }}
                              onClick={(event) => handleClick(2, index, event)}
                            >
                              9:00{" "}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td
                              key={index}
                              style={{
                                backgroundColor: state[3][index]
                                  ? "salmon"
                                  : "",
                                color: state[3][index] ? "white" : "",
                              }}
                              onClick={(event) => handleClick(3, index, event)}
                            >
                              10:00{" "}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td
                              key={index}
                              style={{
                                backgroundColor: state[4][index]
                                  ? "salmon"
                                  : "",
                                color: state[4][index] ? "white" : "",
                              }}
                              onClick={(event) => handleClick(4, index, event)}
                            >
                              11:00{" "}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td
                              key={index}
                              style={{
                                backgroundColor: state[5][index]
                                  ? "salmon"
                                  : "",
                                color: state[5][index] ? "white" : "",
                              }}
                              onClick={(event) => handleClick(5, index, event)}
                            >
                              12:00{" "}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td
                              key={index}
                              style={{
                                backgroundColor: state[6][index]
                                  ? "salmon"
                                  : "",
                                color: state[6][index] ? "white" : "",
                              }}
                              onClick={(event) => handleClick(6, index, event)}
                            >
                              13:00{" "}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td
                              key={index}
                              style={{
                                backgroundColor: state[7][index]
                                  ? "salmon"
                                  : "",
                                color: state[7][index] ? "white" : "",
                              }}
                              onClick={(event) => handleClick(7, index, event)}
                            >
                              14:00{" "}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td
                              key={index}
                              style={{
                                backgroundColor: state[8][index]
                                  ? "salmon"
                                  : "",
                                color: state[8][index] ? "white" : "",
                              }}
                              onClick={(event) => handleClick(8, index, event)}
                            >
                              15:00{" "}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td
                              key={index}
                              style={{
                                backgroundColor: state[9][index]
                                  ? "salmon"
                                  : "",
                                color: state[9][index] ? "white" : "",
                              }}
                              onClick={(event) => handleClick(9, index, event)}
                            >
                              16:00{" "}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td
                              key={index}
                              style={{
                                backgroundColor: state[10][index]
                                  ? "salmon"
                                  : "",
                                color: state[10][index] ? "white" : "",
                              }}
                              onClick={(event) => handleClick(10, index, event)}
                            >
                              17:00{" "}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td
                              key={index}
                              style={{
                                backgroundColor: state[11][index]
                                  ? "salmon"
                                  : "",
                                color: state[11][index] ? "white" : "",
                              }}
                              onClick={(event) => handleClick(11, index, event)}
                            >
                              18:00{" "}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td
                              key={index}
                              style={{
                                backgroundColor: state[12][index]
                                  ? "salmon"
                                  : "",
                                color: state[12][index] ? "white" : "",
                              }}
                              onClick={(event) => handleClick(12, index, event)}
                            >
                              19:00{" "}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td
                              key={index}
                              style={{
                                backgroundColor: state[13][index]
                                  ? "salmon"
                                  : "",
                                color: state[13][index] ? "white" : "",
                              }}
                              onClick={(event) => handleClick(13, index, event)}
                            >
                              20:00{" "}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td
                              key={index}
                              style={{
                                backgroundColor: state[14][index]
                                  ? "salmon"
                                  : "",
                                color: state[14][index] ? "white" : "",
                              }}
                              onClick={(event) => handleClick(14, index, event)}
                            >
                              21:00{" "}
                            </td>
                          ))}
                        </tr>
                        <tr>
                          {Array.from({ length: 7 }).map((_, index) => (
                            <td
                              key={index}
                              style={{
                                backgroundColor: state[15][index]
                                  ? "salmon"
                                  : "",
                                color: state[15][index] ? "white" : "",
                              }}
                              onClick={(event) => handleClick(15, index, event)}
                            >
                              22:00{" "}
                            </td>
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
export default Mentor;
