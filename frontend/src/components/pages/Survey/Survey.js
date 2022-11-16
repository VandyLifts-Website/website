/* Copyright Josh Payne & Paul Opiyo @2022 - All rights reserved */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TimeGrid from "../../layouts/TimeGrid/TimeGrid";
import Form from "react-bootstrap/Form";

function Survey() {
  const { orgId } = useParams();
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

  useEffect(() => {
    const fetchData = async () => {
      const orgResponse = await axios.get(`/api/organizations/${orgId}`);
      console.log("Organization:", orgResponse);

      const timeResponse = await axios.get(`/api/time_availability/`);
      console.log("Time Response: ", timeResponse);

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

  const [surveyData, setSurveyData] = useState({
    id: 0,
    user: {},
    organization: {},
    time_availability: [],
    type_of_person: "",
    max_matches: 0,
    name: "",
    power_lifting: false,
    body_building: false,
    olympic_lifting: false,
    gender: "",
    gender_preference: "",
  });

  const getCookie = (name) => {
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
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    surveyData.id = orgData.id;
    surveyData.organization = { id: orgData.id, title: orgData.title };
    surveyData.user = { id: 1, username: "johnnybravo" };
    console.log("Survey Data", surveyData);
    const csrftoken = getCookie("csrftoken");
    const postData = async () => {
      const response = await axios.post(
        "/api/survey_submissions/",
        surveyData,
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
  };

  const handleInputChange = (event) => {
    event.preventDefault();

    switch (event.target.id) {
      case "power_lifting":
      case "olympic_lifting":
      case "body_building":
        setSurveyData({
          ...surveyData,
          [event.target.id]: event.target.checked,
        });
        break;
      // case "gender":
      // case "gender_preference":
      // case "type_of_person":
      //   console.log("Selected Index: ", event.target.value);
      //   setData({
      //     ...data,
      //     [event.target.id]: event.options[event.selectedIndex].text,
      //   });
      //   break;
      default:
        console.log("Value: ", event.target.value);
        setSurveyData({
          ...surveyData,
          [event.target.id]: event.target.value,
        });
    }

    console.log("Data", surveyData);
  };

  return (
    <>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-6 col-xl-5">
            <form
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
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-outline mb-4">
                  <Form.Check
                    type="checkbox"
                    id="power_lifting"
                    label="Power Lifting"
                    onChange={handleInputChange}
                  />
                  <Form.Check
                    type="checkbox"
                    id="olympic_lifting"
                    label="Olympic Lifting"
                    onChange={handleInputChange}
                  />
                  <Form.Check
                    type="checkbox"
                    id="body_building"
                    label="Body Building"
                    onClick={(event) => console.log(event.target.checked)}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-outline mb-4">
                  <select
                    id="gender"
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleInputChange}
                  >
                    <option selected>Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="N">Prefer not to say</option>
                  </select>
                </div>
                <div className="form-outline mb-4">
                  <select
                    id="gender_preference"
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleInputChange}
                  >
                    <option selected>Gender Preference</option>
                    <option value="1">Same</option>
                    <option value="2">All</option>
                  </select>
                </div>
                <div className="form-outline mb-4">
                  <select
                    id="type_of_person"
                    className="form-select"
                    aria-label="Default select example"
                    onChange={handleInputChange}
                  >
                    <option selected>Type of Person</option>
                    {orgData.type_of_organization === "Mentor/Mentee" && (
                      <>
                        <option value="Mentor">Mentor</option>
                        <option value="Mentee">Mentee</option>
                      </>
                    )}
                    {orgData.type_of_organization === "Buddy" && (
                      <>
                        <option value="Buddy">Buddy</option>
                      </>
                    )}
                    {orgData.type_of_organization === "Day In The Life" && (
                      <>
                        <option value="Guide Lifter">Guide Lifter</option>
                        <option value="Learner Lifter">Learner Lifter</option>
                      </>
                    )}
                  </select>
                </div>
                {surveyData.type_of_person === "Mentor" && (
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
                )}
                <TimeGrid
                  state={stateGrid}
                  setState={setStateGrid}
                  times={times}
                  data={surveyData}
                  setData={setSurveyData}
                />
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
