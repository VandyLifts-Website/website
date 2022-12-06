/* Copyright P. Opiyo @2022 - All rights reserved */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { FaTrash } from "react-icons/fa/index.js";

function Admin() {
  const { orgId } = useParams();
  const [users, setUsers] = useState([]);
  const [confirmedMatches, setConfirmedMatches] = useState([]);
  const [unconfirmedMatches, setUncomfirmedMatches] = useState([]);
  const [leftPerson, setLeftPerson] = useState(null);
  const [rightPerson, setRightPerson] = useState(null);
  const [error, setError] = useState("");

  const loadData = () => {
    const fetchData = async () => {
      const surveyResponse = await axios.get(
        `/api/survey_submissions/?organization=${orgId}`
      );
      if (surveyResponse.status !== 200) {
        throw new Error(
          `Error fetching survey submissions: ${surveyResponse.status}`
        );
      }
      setUsers(surveyResponse.data);

      const unconfirmedResponse = await axios.get(
        `/api/matches/?organization=${orgId}&confirmed=false`
      );
      if (unconfirmedResponse.status !== 200) {
        throw new Error(
          `Error fetching uncofirmed matches: ${unconfirmedResponse.status}`
        );
      }
      setUncomfirmedMatches(unconfirmedResponse.data);

      const confirmedResponse = await axios.get(
        `/api/matches/?organization=${orgId}&confirmed=true`
      );
      if (unconfirmedResponse.status !== 200) {
        throw new Error(
          `Error fetching cofirmed matches: ${confirmedResponse.status}`
        );
      }
      setConfirmedMatches(confirmedResponse.data);
    };

    fetchData().catch((err) => {
      setError(err.message);
    });
  };

  useEffect(loadData, [orgId]);

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
          <td className="text-center">
            <button
              className="btn btn-danger"
              onClick={(ev) => deleteSurvey(ev, user.id)}
            >
              <FaTrash />
            </button>
          </td>
        </tr>
      );
    });
    return values;
  };

  const deleteMatch = async (ev, matchId) => {
    ev.preventDefault();

    const response = await axios.delete(`/api/matches/${matchId}`);

    if (!response.ok) {
      setError(response.data);
    }
  };

  const deleteSurvey = async (ev, surveyId) => {
    ev.preventDefault();

    const response = await axios.delete(`/api/survey_submissions/${surveyId}`);

    if (!response.ok) {
      setError(response.data);
    }
  };

  const currentMatches = (array) => {
    const values = array?.map((match) => {
      return (
        <tr key={match.id}>
          <td>{match?.people[0]?.name}</td>
          <td>{match?.people[1]?.name}</td>
          <td>{match?.people[0]?.organization.title}</td>
          <td className="text-center">
            <button
              className="btn btn-danger"
              onClick={(ev) => deleteMatch(ev, match.id)}
            >
              <FaTrash />
            </button>
          </td>
        </tr>
      );
    });
    return values;
  };

  const handleClick = async (event) => {
    event.preventDefault();

    const leftTimeIds = users
      .find((person) => person.id.toString() === leftPerson)
      .time_availability.map((time) => time.id);
    const rightTimeIds = users
      .find((person) => person.id.toString() === rightPerson)
      .time_availability.map((time) => time.id);

    const response = await axios.post(`/api/matches/`, {
      organization: orgId,
      confirmed: false,
      people: [leftPerson, rightPerson],
      times_matched: leftTimeIds.filter((leftTimeId) =>
        rightTimeIds.includes(leftTimeId)
      ),
    });

    if (response.status !== 201) {
      console.log(`Error status: `, response.status);
      throw new Error(`Error! Status: ${response.status}`);
    }
  };

  const handleClick2 = async (event) => {
    event.preventDefault();

    const response = await axios.post(
      `/api/organizations/${orgId}/calculate_automatic_matches/`,
      {}
    );

    if (response.status !== 200) {
      console.log("Error status: ", response.status);
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
                    <h5>Administrator Portal</h5>
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
                                <th className="text-center">Delete Survey</th>
                              </tr>
                              {userData(users)}
                            </thead>
                          </Table>
                          <Button
                            variant="outline-success mt-4"
                            onClick={(_) => loadData()}
                          >
                            Refresh Users
                          </Button>
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
                                  onChange={(event) =>
                                    setLeftPerson(event.target.value)
                                  }
                                >
                                  <option value={""}>User A</option>
                                  {renderUsers(users)}
                                </select>
                              </Col>
                              <Col>
                                <select
                                  id="people"
                                  className="form-select"
                                  aria-label="Default select example"
                                  onChange={(event) =>
                                    setRightPerson(event.target.value)
                                  }
                                >
                                  <option value={""}>User B</option>
                                  {renderUsers(users)}
                                </select>
                              </Col>
                            </Row>
                            <Button
                              variant="outline-primary mt-4 me-2"
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
                          <label>Unconfirmed Matches</label>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>User A</th>
                                <th>User B</th>
                                <th>Organization</th>
                                <th className="text-center">Edit Match</th>
                              </tr>
                              {currentMatches(
                                unconfirmedMatches.filter(
                                  (match) => match.people.length
                                )
                              )}
                            </thead>
                          </Table>
                          <label>Confirmed Matches</label>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>User A</th>
                                <th>User B</th>
                                <th>Organization</th>
                                <th className="text-center">Edit Match</th>
                              </tr>
                              {currentMatches(
                                confirmedMatches.filter(
                                  (match) => match.people.length
                                )
                              )}
                            </thead>
                          </Table>
                          <Button
                            variant="outline-success mt-4"
                            onClick={(_) => loadData()}
                          >
                            Refresh Matches
                          </Button>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    {error && (
                      <div className="alert alert-danger mt-2">{error}</div>
                    )}
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

export default Admin;
