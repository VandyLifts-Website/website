/* Copyright P. Opiyo @2022 - All rights reserved */
import React, { useEffect, useState } from "react";
import axios from "axios";
import Accordion from "react-bootstrap/Accordion";

function SurveySubmission({ surveySubmission, isSelf = false }) {
  return (
    <div>
      <div className="row">
        <label className="col-3 fw-bold">Type:</label>
        <p className="col-6">{surveySubmission.type_of_person}</p>
      </div>
      <div className="row">
        <label className="col-3 fw-bold">Phone Number:</label>
        <p className="col-6">{surveySubmission.phone_number}</p>
      </div>
      <div className="row">
        <label className="col-3 fw-bold">Email:</label>
        <p className="col-6">{surveySubmission.user.email}</p>
      </div>
      <div className="row">
        <label className="col-3 fw-bold">Gender:</label>
        <p className="col-6">{surveySubmission.gender}</p>
      </div>
      <div className="row">
        <label className="col-3 fw-bold">Gender Preference:</label>
        <p className="col-6">{surveySubmission.gender_preference}</p>
      </div>
      {isSelf && surveySubmission.type_of_person === "Mentor" && (
        <div className="row">
          <label className="col-3 fw-bold">Max number of mentees:</label>
          <p className="col-6">{surveySubmission.max_matches}</p>
        </div>
      )}
      <div className="row">
        <label className="col-3 fw-bold">Lifting Styles:</label>
        <p className="col-6">
          {Object.entries({
            "Power Lifting": surveySubmission.power_lifting,
            "Body Building": surveySubmission.body_building,
            "Olympic Lifting": surveySubmission.olympic_lifting,
          })
            .filter((entry) => entry[1])
            .map((entry) => entry[0])
            .join(", ")}
        </p>
      </div>
    </div>
  );
}

function Times({ timeArray }) {
  return (
    <ul>
      {timeArray.map((time) => (
        <li key={time.id}>
          {time.time} {time.day}
        </li>
      ))}
    </ul>
  );
}

function Match({ surveySubmission, match }) {
  const match_person = match.people.filter(
    (match) => match.id !== surveySubmission.id
  )[0];

  const matchTimeIds = match_person.time_availability.map((time) => time.id);

  const fullTimesMatched = surveySubmission.time_availability.filter((time) =>
    matchTimeIds.includes(time.id)
  );

  return (
    <Accordion.Item eventKey={match.id}>
      <Accordion.Header>{match_person.name}</Accordion.Header>
      <Accordion.Body>
        <SurveySubmission surveySubmission={match_person} />
        Times matched: (guaranteed but incomplete)
        <Times timeArray={match.times_matched} />
        Times matched: (complete but not guaranteed)
        <Times timeArray={fullTimesMatched} />
      </Accordion.Body>
    </Accordion.Item>
  );
}

function Matches({ surveySubmission, matches }) {
  return (
    <Accordion alwaysOpen>
      {matches.map((match) => {
        return (
          <Match
            key={match.id}
            surveySubmission={surveySubmission}
            match={match}
          />
        );
      })}
    </Accordion>
  );
}

function Profile({ userData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (userData.id === undefined) {
      return;
    }

    const fetchData = async () => {
      const response = await axios(
        `/api/survey_submissions/?user=${userData.id}`
      );

      if (response.status !== 200) {
        console.log("Error status:", response.status);
        throw new Error(`Error! status: ${response.status}`);
      }

      const surveySubmissions = response.data;

      const newData = await Promise.all(
        surveySubmissions.map(async (surveySubmission) => {
          const response = await axios(
            `/api/matches/?people=${surveySubmission.id}`
          );

          if (response.status !== 200) {
            console.log("Error status:", response.status);
            throw new Error(`Error! status: ${response.status}`);
          }

          const matches = response.data;

          return {
            surveySubmission: surveySubmission,
            matches: matches,
          };
        })
      );

      setData(newData);
    };

    fetchData().catch((err) => {
      console.log(err.message);
    });
  }, [userData]);

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
                    <h5>
                      {userData.first_name} {userData.last_name}
                    </h5>
                    <p>{userData.email}</p>
                  </div>
                </div>
                <div className="card-body p-4 text-black">
                  <div className="mb-1 mt-3">
                    <p className="lead fw-bold mb-3">My Organizations</p>
                  </div>
                  <div className="row g-2">
                    <Accordion alwaysOpen>
                      {data.map(({ surveySubmission, matches }) => {
                        return (
                          <Accordion.Item
                            key={surveySubmission.id}
                            eventKey={surveySubmission.id}
                          >
                            <Accordion.Header>
                              {surveySubmission.organization.title}
                            </Accordion.Header>
                            <Accordion.Body>
                              <SurveySubmission
                                surveySubmission={surveySubmission}
                                isSelf={true}
                              />
                              <Matches
                                surveySubmission={surveySubmission}
                                matches={matches}
                              />
                            </Accordion.Body>
                          </Accordion.Item>
                        );
                      })}
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
