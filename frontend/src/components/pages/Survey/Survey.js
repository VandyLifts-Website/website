/* Copyright Joshua Payne & Paul Opiyo @2022 - All rights reserved */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TimeGrid from "../../layouts/TimeGrid/TimeGrid";
import Form from "react-bootstrap/Form";
import Input from "react-phone-number-input/input";

function Survey(props) {
  const { orgId } = useParams();
  const navigate = useNavigate();
  const [orgData, setOrgData] = useState({});
  const [times, setTimes] = useState([]);
  const [stateGrid, setStateGrid] = useState([
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
    [false, false, false, false, false, false, false],
  ]);

  const [phonenumber, setPhoneNumber] = useState("");
  const [timeAvailability, setTimeAvailability] = useState([]);
  const [typeOfPerson, setTypeOfPerson] = useState("");
  const [maxMatches, setMaxMatches] = useState(0);
  const [name, setName] = useState("");
  const [powerLifting, setPowerLifting] = useState(false);
  const [bodyBuilding, setBodyBuilding] = useState(false);
  const [olympicLifting, setOlympicLifting] = useState(false);
  const [gender, setGender] = useState("");
  const [genderPreference, setGenderPreference] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const orgResponse = await axios.get(`/api/organizations/${orgId}`);

      const timeResponse = await axios.get(`/api/time_availability/`);

      if (orgResponse.status !== 200) {
        console.log("Error status:", orgResponse.status);
        throw new Error(`Error! status: ${orgResponse.status}`);
      }

      if (timeResponse.status !== 200) {
        console.log("Error status:", timeResponse.status);
        throw new Error(`Error! status: ${timeResponse.status}`);
      }

      setOrgData(orgResponse.data);
      setTimes(timeResponse.data);
    };

    fetchData().catch((err) => {
      console.log(err.message);
    });
  }, [orgId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const surveyData = {
      phone_number: phonenumber,
      time_availability: timeAvailability,
      type_of_person: typeOfPerson,
      max_matches: typeOfPerson === "1" ? maxMatches : "1",
      name: name,
      power_lifting: powerLifting,
      body_building: bodyBuilding,
      olympic_lifting: olympicLifting,
      gender: gender,
      gender_preference: genderPreference,
      organization: orgId,
      user: props.userData.id,
    };

    console.log("Survey Data", surveyData);

    const postData = async () => {
      const response = await axios.post("/api/survey_submissions/", surveyData);
      console.log(response);
      if (response.status === 201) {
        navigate(`/profile`);
      }
    };
    postData().catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-6 col-xl-5">
            <Form
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
              onSubmit={handleSubmit}
            >
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">{orgData.title}</h3>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Name"
                    maxLength={50}
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="form-outline mb-4">
                  <Input
                    id="phone_number"
                    placeholder="Enter phone number"
                    onChange={setPhoneNumber}
                  />
                </div>
                <div className="form-outline mb-4">
                  <Form.Check
                    type="checkbox"
                    id="power_lifting"
                    label="Power Lifting"
                    onChange={(event) => setPowerLifting(event.target.value)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="olympic_lifting"
                    label="Olympic Lifting"
                    onChange={(event) => setOlympicLifting(event.target.value)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="body_building"
                    label="Body Building"
                    onChange={(event) => setBodyBuilding(event.target.value)}
                  />
                </div>
                <div className="form-outline mb-4">
                  <Form.Select
                    id="gender"
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(event) => setGender(event.target.value)}
                  >
                    <option value="">Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="N">Prefer not to say</option>
                  </Form.Select>
                </div>
                <div className="form-outline mb-4">
                  <Form.Select
                    id="gender_preference"
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(event) =>
                      setGenderPreference(event.target.value)
                    }
                  >
                    <option value="">Gender Preference</option>
                    <option value="1">Same</option>
                    <option value="2">All</option>
                  </Form.Select>
                </div>
                <div className="form-outline mb-4">
                  <Form.Select
                    id="type_of_person"
                    className="form-select"
                    aria-label="Default select example"
                    onChange={(event) => setTypeOfPerson(event.target.value)}
                  >
                    <option value="">Type of Person</option>
                    {orgData.type_of_organization === "Mentor/Mentee" && (
                      <>
                        <option value="1">Mentor</option>
                        <option value="2">Mentee</option>
                      </>
                    )}
                    {orgData.type_of_organization === "Buddy" && (
                      <>
                        <option value="3">Buddy</option>
                      </>
                    )}
                    {orgData.type_of_organization === "Day In The Life" && (
                      <>
                        <option value="4">Guide Lifter</option>
                        <option value="5">Learner Lifter</option>
                      </>
                    )}
                  </Form.Select>
                </div>
                {typeOfPerson === "1" && (
                  <div className="form-outline mb-4">
                    <Form.Select
                      className="form-select"
                      aria-label="Default select example"
                      onChange={(event) => setMaxMatches(event.target.value)}
                    >
                      <option value="">Max number of mentees</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Form.Select>
                  </div>
                )}
                <TimeGrid
                  state={stateGrid}
                  setState={setStateGrid}
                  times={times}
                  data={timeAvailability}
                  setData={setTimeAvailability}
                />
                <button
                  className="btn btn-outline-primary btn-block"
                  id="submitBtn"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Survey;
