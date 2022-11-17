/* Copyright P. Opiyo @2022 - All rights reserved */
import React from "react";
import Accordion from "react-bootstrap/Accordion";

const LiftingStyle = (olympic, power_lifting) => {
  if (olympic) {
    return "Olympic";
  } else if (power_lifting) {
    return "Power Lifting";
  }
};

function MyOrgs(props) {
  console.log(props.people);
  return (
    <Accordion alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Mentor Matches</Accordion.Header>
        <Accordion.Body>
          <div className="row">
            <label className="col-3 fw-bold">Mentor:</label>
            <p className="col-6">{props.people[0].name}</p>
          </div>
          <div className="row">
            <label className="col-3 fw-bold">Lifting Style:</label>
            <p className="col-6">
              {LiftingStyle(
                props.people[0].olympic_lifting,
                props.people[0].power_lifting
              )}
            </p>
          </div>
          <div className="row">
            <label className="col-3 fw-bold">Lifting Days:</label>
            <p className="col-4">Mon, Wed, Fri</p>
          </div>
          <div className="row">
            <label className="col-3 fw-bold">Lifting Time:</label>
            <p className="col-4">4:00PM-5:00PM</p>
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Buddy Matches</Accordion.Header>
        <Accordion.Body>
          <div className="row">
            <label className="col-3 fw-bold">Lifting Style:</label>
            <p className="col-6">Olympic</p>
          </div>
          <div className="row">
            <label className="col-3 fw-bold">Lifting Days:</label>
            <p className="col-4">Mon, Wed, Fri</p>
          </div>
          <div className="row">
            <label className="col-3 fw-bold">Lifting Time:</label>
            <p className="col-4">4:00PM-5:00PM</p>
          </div>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Day in the Life of a Lifter</Accordion.Header>
        <Accordion.Body>
          <div className="row">
            <label className="col-3 fw-bold">Lifting Style:</label>
            <p className="col-6">Olympic</p>
          </div>
          <div className="row">
            <label className="col-3 fw-bold">Lifting Days:</label>
            <p className="col-4">Mon, Wed, Fri</p>
          </div>
          <div className="row">
            <label className="col-3 fw-bold">Lifting Time:</label>
            <p className="col-4">4:00PM-5:00PM</p>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default MyOrgs;
