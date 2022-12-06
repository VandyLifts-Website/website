/* Copyright Joshua Payne & Paul Opiyo @2022 - All rights reserved */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import TimeGrid from "../../layouts/TimeGrid/TimeGrid";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Input from "react-phone-number-input/input";
import Accordion from "react-bootstrap/Accordion";

function Survey(props) {
  const { orgId } = useParams();
  const navigate = useNavigate();
  const [orgData, setOrgData] = useState({});
  const [times, setTimes] = useState([]);
  const [stateGrid, setStateGrid] = useState(
    [...Array(17)].map((_) => Array(7).fill(false))
  );
  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);

  const [phonenumber, setPhoneNumber] = useState("");
  const [timeAvailability, setTimeAvailability] = useState([]);
  const [typeOfPerson, setTypeOfPerson] = useState("");
  const [maxMatches, setMaxMatches] = useState(0);
  const [name, setName] = useState("");
  const [powerLifting, setPowerLifting] = useState(false);
  const [bodyBuilding, setBodyBuilding] = useState(false);
  const [olympicLifting, setOlympicLifting] = useState(false);
  const [generalLifting, setGeneralLifting] = useState(false);
  const [gender, setGender] = useState("");
  const [genderPreference, setGenderPreference] = useState("");
  const [changingMentors, setChangingMentors] = useState(false);
  const [hoursPerWeek, setHoursPerWeek] = useState(null);
  const [whyInterestedInBuddy, setWhyInterestedInBuddy] = useState("");
  const [wantPartnerOfSameExperience, setWantPartnerOfSameExperience] =
    useState(false);

  const [priorExperience, setPriorExperience] = useState("");
  const [interests, setInterests] = useState("");
  const [elseInvolved, setElseInvolved] = useState("");
  const [anythingElse, setAnythingElse] = useState("");
  const [questions, setQuestions] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const orgResponse = await axios.get(`/api/organizations/${orgId}`);

      const timeResponse = await axios.get(`/api/time_availability/`);

      if (orgResponse.status !== 200) {
        throw new Error(`Error! status: ${orgResponse.status}`);
      }

      if (timeResponse.status !== 200) {
        throw new Error(`Error! status: ${timeResponse.status}`);
      }

      setOrgData(orgResponse.data);
      setTimes(timeResponse.data);
    };

    fetchData().catch((err) => {
      setError(err.message);
    });
  }, [orgId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const surveyData = {
      phone_number: phonenumber,
      time_availability: timeAvailability,
      type_of_person: typeOfPerson,
      name: name,
      power_lifting: powerLifting,
      general_lifting: generalLifting,
      body_building: bodyBuilding,
      olympic_lifting: olympicLifting,
      gender: gender,
      gender_preference: genderPreference,
      organization: orgId,
      user: props.userData.id,
      max_matches: typeOfPerson === "1" ? maxMatches : "1",
      hours_per_week: typeOfPerson === "1" ? hoursPerWeek : null,
      changingMentors: typeOfPerson === "2" ? changingMentors : false,
      why_interested_in_buddy: typeOfPerson === "3" ? whyInterestedInBuddy : "",
      want_partner_of_same_experience:
        typeOfPerson === "3" ? wantPartnerOfSameExperience : false,
      prior_experience: priorExperience,
      interests: interests,
      else_involved: elseInvolved,
      anything_else: anythingElse,
      questions: questions,
    };

    const postData = async () => {
      const response = await axios.post("/api/survey_submissions/", surveyData);
      if (response.status === 201) {
        navigate(`/profile`);
      }
    };

    postData().catch((err) => {
      const errObject = err.response.data;
      const errorArray = [];
      for (const property in errObject) {
        errorArray.push(`${property}: ${errObject[property]}`);
      }
      setErrors(errorArray);
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
                    className="form-control"
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
                    onChange={(event) => setPowerLifting(event.target.checked)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="olympic_lifting"
                    label="Olympic Lifting"
                    onChange={(event) =>
                      setOlympicLifting(event.target.checked)
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    id="general_lifting"
                    label="General Lifting"
                    onChange={(event) =>
                      setGeneralLifting(event.target.checked)
                    }
                  />
                  <Form.Check
                    type="checkbox"
                    id="body_building"
                    label="Body Building"
                    onChange={(event) => setBodyBuilding(event.target.checked)}
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
                <FloatingLabel
                  label="Type of Person"
                  className="form-outline mb-4"
                  controlId="type_of_person"
                >
                  <Form.Select
                    className="form-select"
                    aria-label="Default select example"
                    placeholder="Select Type of Person"
                    onChange={(event) => setTypeOfPerson(event.target.value)}
                  >
                    <option value="">Select Type of Person</option>
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
                </FloatingLabel>
                {typeOfPerson === "1" && (
                  <>
                    <FloatingLabel
                      label="Maximum number of mentees you are interested in having"
                      className="form-outline mb-4"
                      controlId="max_matches"
                    >
                      <Form.Select
                        className="form-select"
                        aria-label="Default select example"
                        placeholder="Maximum number of mentees you are interested in having"
                        onChange={(event) => setMaxMatches(event.target.value)}
                      >
                        <option value="">
                          Select maximum number of mentees
                        </option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                      </Form.Select>
                    </FloatingLabel>
                    <FloatingLabel
                      label="How many hours per week can you commit to being a mentor?"
                      className="form-outline mb-4"
                      controlId="hours_per_week"
                    >
                      <Form.Control
                        type="number"
                        placeholder="0"
                        onChange={(event) =>
                          setHoursPerWeek(event.target.value)
                        }
                      />
                    </FloatingLabel>
                  </>
                )}
                {typeOfPerson === "2" && (
                  <div className="form-outline mb-4">
                    <Form.Check
                      type="checkbox"
                      id="changing_mentors"
                      label="Are you interested in working with different mentors throughout the semester?"
                      onChange={(event) =>
                        setChangingMentors(event.target.checked)
                      }
                    />
                  </div>
                )}
                {typeOfPerson === "3" && (
                  <>
                    <FloatingLabel
                      label="Why are you interested in being a buddy?"
                      className="form-outline mb-4"
                      controlId="why_interested_in_buddy"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Why are you interested in being a buddy?"
                        onChange={(event) =>
                          setWhyInterestedInBuddy(event.target.value)
                        }
                      />
                    </FloatingLabel>
                    <div className="form-outline mb-4">
                      <Form.Check
                        type="checkbox"
                        id="want_partner_of_same_experience"
                        label="Are you interested in working with different mentors throughout the semester?"
                        onChange={(event) =>
                          setWantPartnerOfSameExperience(event.target.checked)
                        }
                      />
                    </div>
                  </>
                )}
                <FloatingLabel
                  label="What is your prior experience with fitness?"
                  className="form-outline mb-4"
                  controlId="prior_experience"
                >
                  <Form.Control
                    type="text"
                    placeholder="What is your prior experience with fitness?"
                    onChange={(event) => setPriorExperience(event.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  label="Tell me a little about your interests"
                  className="form-outline mb-4"
                  controlId="interests"
                >
                  <Form.Control
                    type="text"
                    placeholder="Tell me a little about your interests"
                    onChange={(event) => setInterests(event.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  label="What else are you involved in on campus?"
                  className="form-outline mb-4"
                  controlId="else_involved"
                >
                  <Form.Control
                    type="text"
                    placeholder="What else are you involved in on campus?"
                    onChange={(event) => setElseInvolved(event.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  label="Anything else you'd like me to know?"
                  className="form-outline mb-4"
                  controlId="anything_else"
                >
                  <Form.Control
                    type="text"
                    placeholder="Anything else you'd like me to know?"
                    onChange={(event) => setAnythingElse(event.target.value)}
                  />
                </FloatingLabel>
                <FloatingLabel
                  label="Any questions about time commitment, how mentorship will work, etc.?"
                  className="form-outline mb-4"
                  controlId="questions"
                >
                  <Form.Control
                    type="text"
                    placeholder="Any questions about time commitment, how mentorship will work, etc.?"
                    onChange={(event) => setQuestions(event.target.value)}
                  />
                </FloatingLabel>
                <Accordion defaultActiveKey="0" className="mb-4">
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Time Availabilities</Accordion.Header>
                    <Accordion.Body>
                      <TimeGrid
                        state={stateGrid}
                        setState={setStateGrid}
                        times={times}
                        data={timeAvailability}
                        setData={setTimeAvailability}
                      />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <button
                  className="btn btn-outline-primary btn-block"
                  id="submitBtn"
                  type="submit"
                >
                  Submit
                </button>
                {error && (
                  <div className="alert alert-danger mt-2">{error}</div>
                )}
                {errors.length !== 0 && (
                  <div className="alert alert-danger mt-2">
                    {errors.map((err, i) => {
                      return <li key={i}>{err}</li>;
                    })}
                  </div>
                )}
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
export default Survey;
