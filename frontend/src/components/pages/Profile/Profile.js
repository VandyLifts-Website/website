/* Copyright P. Opiyo @2022 - All rights reserved */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";

// const LiftingStyle = (olympic, power_lifting) => {
//   if (olympic) {
//     return "Olympic";
//   } else if (power_lifting) {
//     return "Power Lifting";
//   }
// };

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

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
                    <img src="/images/profile.jpg" alt="My profile" />
                  </div>
                  <div className="ms-3" style={{ marginTop: "130px" }}>
                    <h5>John Doe</h5>
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
