/* Copyright P. Opiyo @2022 - All rights reserved */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import csrftoken from "../../../csrftoken.js";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

function Profile() {
  const [users, setUsers] = useState([]);
  const [matches, setMatches] = useState([]);
  const [match, setMatch] = useState({
    organization: 1,
    confirmed: false,
    people: [],
    times_matched: [1],
  });

  useEffect(() => {
    const fetchData = async () => {
      const surveyResponse = await axios.get("/api/survey_submissions/");

      if (surveyResponse.status !== 200) {
        console.log("Error status:", surveyResponse.status);
        throw new Error(`Error! status: ${surveyResponse.status}`);
      }

      const responseJson = surveyResponse.data;
      setUsers(responseJson);

      const matchResponse = await axios.get("/api/matches");
      setMatches(matchResponse.data);
    };

    fetchData().catch((err) => {
      console.log(err.message);
    });
  }, []);

  if (users !== []) {
    console.log("User Data", users);
  }

  const renderUsers = (array) => {
    const values = array?.map((user) => {
      return (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      );
    });
    return values;
  };

  const userData = (array) => {
    const values = array?.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.name}</td>
          <td>{user.gender}</td>
          <td>{user.type_of_person}</td>
          <td>{user.organization.title}</td>
        </tr>
      );
    });
    return values;
  };

  const currentMatches = (array) => {
    const values = array?.map((match) => {
      return (
        <tr key={match.id}>
          <td>{match?.people[0]?.name}</td>
          <td>{match?.people[1]?.name}</td>
          <td>{match?.people[0]?.organization.title}</td>
        </tr>
      );
    });
    return values;
  };

  const selectUser = (event) => {
    event.preventDefault();

    setMatch({
      ...match,
      people: [...match.people, event.target.value],
    });
    console.log("Current match", match);
  };

  const handleClick = async (event) => {
    event.preventDefault();

    const response = await axios.post(`/api/matches/`, match, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      withCredentials: true,
    });

    if (response.status !== 200) {
      console.log(`Error status: `, response.status);
      throw new Error(`Error! Status: ${response.status}`);
    }
  };

  const handleClick2 = async (event) => {
    event.preventDefault();

    const response = await axios.post(`/api/organization/1/calculate_automatic_matches/`, {}, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      withCredentials: true,
    });

    if (response.status !== 200) {
      console.log(`Error status: `, response.status);
      throw new Error(`Error! Status: ${response.status}`);
    }
  };

  return (
    <div>
      <section className="h-100 gradient-custom-2">
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
                    <img src="/images/admin.png" alt="My admin" />
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <h5>Your Admin</h5>
                    <p>admin@vanderbilt.edu</p>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-1 mt-3">
                    <p className="lead fw-bold mb-3">Organizations</p>
                  </div>
                  <div className="row g-2">
                    <Accordion alwaysOpen>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          View Users by Organization
                        </Accordion.Header>
                        <Accordion.Body>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Gender</th>
                                <th>Type of Person</th>
                                <th>Organization</th>
                              </tr>
                              {userData(users)}
                            </thead>
                          </Table>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Create Matches</Accordion.Header>
                        <Accordion.Body>
                          <Container>
                            <Row>
                              <Col>
                                <select
                                  id="people"
                                  className="form-select"
                                  aria-label="Default select example"
                                  onChange={selectUser}
                                >
                                  <option selected>User A</option>
                                  {renderUsers(users)}
                                </select>
                              </Col>
                              <Col>
                                <select
                                  id="people"
                                  className="form-select"
                                  aria-label="Default select example"
                                  onChange={selectUser}
                                >
                                  <option selected>User B</option>
                                  {renderUsers(users)}
                                </select>
                              </Col>
                            </Row>
                            <Button
                              variant="outline-primary mt-4"
                              onClick={handleClick}
                            >
                              Create a Match
                            </Button>
                            <Button
                              variant="outline-primary mt-4"
                              onClick={handleClick2}
                            >
                              Automatic Match
                            </Button>
                          </Container>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>View Matches</Accordion.Header>
                        <Accordion.Body>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>User A</th>
                                <th>User B</th>
                                <th>Organization</th>
                              </tr>
                              {currentMatches(
                                matches.filter((match) => match.people.length)
                              )}
                            </thead>
                          </Table>
                          <Button variant="outline-success mt-4">
                            Refresh Matches
                          </Button>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
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
