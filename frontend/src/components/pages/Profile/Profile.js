/* Copyright P. Opiyo @2022 - All rights reserved */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Accordion from "react-bootstrap/Accordion";

// const LiftingStyle = (olympic, power_lifting) => {
//   if (olympic) {
//     return "Olympic";
//   } else if (power_lifting) {
//     return "Power Lifting";
//   }
// };

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

function Form2() {
  function handleSubmit(e) {
    e.preventDefault();
    const postData = async () => {
      const response = await axios.post('http://example.com/api/time_availability/', {
        day: '1',
        time: '01:01:00'
      },  {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      console.log(response)
    }
    postData().catch(err => {
      console.log(err);
    })  }

  return (
    <form onSubmit={handleSubmit}>
      <Button type="submit">Submit</Button>
    </form>
  );
}

function Profile() {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios("/api/matches/");
      console.log(response);

      if (response.status !== 200) {
        console.log("Error status:", response.status);
        throw new Error(`Error! status: ${response.status}`);
      }

      const responseJson = response.data;
      setData(responseJson);
    };

    fetchData().catch((err) => {
      console.log(err.message);
    });
  }, []);

  console.log("User Data", data);

  const renderList = (array) => {
    const values = array?.map((time) => {
      return (
        <li key={time.id}>
          {time?.time} {time?.day}
        </li>
      );
    });

    return values;
  };

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
                    <img src="/images/profile_pic.jfif" alt="My profile" />
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <h5>John Doe</h5>
                    <Form2 />
                    <p>john.doe@vanderbilt.edu</p>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-1 mt-3">
                    <p className="lead fw-bold mb-3">My Organizations</p>
                  </div>
                  <div className="row g-2">
                    <Accordion alwaysOpen>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Mentor Matches</Accordion.Header>
                        <Accordion.Body>
                          <div className="row">
                            <label className="col-3 fw-bold">Mentor:</label>
                            <p className="col-6">{data[0]?.people[0]?.name}</p>
                          </div>
                          <div className="row">
                            <label className="col-3 fw-bold">
                              Lifting Style:
                            </label>
                            <p className="col-6">
                              {data[0]?.people[0]?.olympic_lifting
                                ? "Olympic"
                                : "Power Lifting"}
                            </p>
                          </div>
                          <div className="row">
                            <label className="col-3 fw-bold">
                              Lifting Times:
                            </label>
                            <ul
                              className="col-8"
                              style={{ listStyleType: "none" }}
                            >
                              {renderList(data[0]?.times_matched)}
                            </ul>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="1">
                        <Accordion.Header>Buddy Matches</Accordion.Header>
                        <Accordion.Body>
                          <div className="row">
                            <label className="col-3 fw-bold">
                              Lifting Style:
                            </label>
                            <p className="col-6">Olympic</p>
                          </div>
                          <div className="row">
                            <label className="col-3 fw-bold">
                              Lifting Days:
                            </label>
                            <p className="col-4">Mon, Wed, Fri</p>
                          </div>
                          <div className="row">
                            <label className="col-3 fw-bold">
                              Lifting Time:
                            </label>
                            <p className="col-4">4:00PM-5:00PM</p>
                          </div>
                        </Accordion.Body>
                      </Accordion.Item>
                      <Accordion.Item eventKey="2">
                        <Accordion.Header>
                          Day in the Life of a Lifter
                        </Accordion.Header>
                        <Accordion.Body>
                          <div className="row">
                            <label className="col-3 fw-bold">
                              Lifting Style:
                            </label>
                            <p className="col-6">Olympic</p>
                          </div>
                          <div className="row">
                            <label className="col-3 fw-bold">
                              Lifting Days:
                            </label>
                            <p className="col-4">Mon, Wed, Fri</p>
                          </div>
                          <div className="row">
                            <label className="col-3 fw-bold">
                              Lifting Time:
                            </label>
                            <p className="col-4">4:00PM-5:00PM</p>
                          </div>
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
