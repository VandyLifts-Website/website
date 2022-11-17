/* Copyright P. Opiyo @2022 - All rights reserved */
import React from "react";
import Container from "react-bootstrap/esm/Container";
import Footer from "../../layouts/Footer/Footer";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

function About() {
  return (
    <div
      className="about"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <section
        className="section"
        style={{ paddingTop: "40px", paddingBottom: "40px", flex: "1 0 auto" }}
      >
        <Container>
          <div className="row">
            <div className="col-md-12 text-center">
              <h3
                className="main-heading"
                style={{ fontSize: "2em", color: "#cfae70" }}
              >
                Our Club
              </h3>
              <div
                className="underline mx-auto"
                style={{
                  height: "4px",
                  width: "4rem",
                  marginTop: "5px",
                  marginBottom: "10px",
                  backgroundColor: "#cfae70",
                }}
              />
              <p style={{ marginBottom: "30px" }}>
                If you want to learn how to lift, fill out the Mentee
                Application If you want to teach others how to lift, fill out
                the Mentor Application If you want a workout partner, fill out
                the Buddy Application If you want to try out being a mentor or
                mentee (trial-run, zero commitment afterwards), fill out the Day
                in the Life of a Lifter Application.Feel free to reach out to
                our Exec Team for extra information on body neutrality (speed
                sessions hosted throughout the school year) and
                nutrition/supplementation. We also have biweekly guest speakers
                (strength training coaches, health and wellness coaches,
                professors, nutritionists, students, and more!) and social
                events centered around physical activity and healthy dining in
                Nashville
              </p>
              <h3
                className="main-heading"
                style={{ fontSize: "2em", color: "#cfae70" }}
              >
                Our Mission Statement
              </h3>
              <div
                className="underline mx-auto"
                style={{
                  height: "4px",
                  width: "4rem",
                  marginTop: "5px",
                  marginBottom: "10px",
                  backgroundColor: "#cfae70",
                }}
              />
              <p style={{ marginBottom: "30px" }}>
                The purpose of Vandy Lifts is to promote an active and healthy
                lifestyle through helping individuals learn how to lift, help
                others how to lift, or find a workout partner to feel
                comfortable at the Vanderbilt Recreation Center (and gyms at
                home). In addition, Vandy Lifts will teach members how to
                structure their meals to meet their workout needs and fuel their
                bodies.
              </p>
              <h3
                className="main-heading"
                style={{ fontSize: "2em", color: "#cfae70" }}
              >
                Board Members
              </h3>
              <div
                className="underline mx-auto"
                style={{
                  height: "4px",
                  width: "4rem",
                  marginTop: "5px",
                  marginBottom: "30px",
                  backgroundColor: "#cfae70",
                }}
              />
              <CardGroup style={{ marginBottom: "30px" }}>
                <Card className="ml-3">
                  <Card.Img
                    variant="top"
                    src="/images/user.png"
                    style={{ height: "280px" }}
                  />
                  <Card.Body>
                    <Card.Title>PRESIDENT</Card.Title>
                    <Card.Text>Melanie Leguizamon</Card.Text>
                  </Card.Body>
                </Card>
                <Card className="ml-3">
                  <Card.Img
                    variant="top"
                    src="/images/user.png"
                    style={{ height: "280px" }}
                  />
                  <Card.Body>
                    <Card.Title>VICE PRESIDENT</Card.Title>
                    <Card.Text>Henry Jonokuchi</Card.Text>
                  </Card.Body>
                </Card>
                <Card className="ml-3">
                  <Card.Img
                    variant="top"
                    src="/images/user.png"
                    style={{ height: "280px" }}
                  />
                  <Card.Body>
                    <Card.Title>TREASURER</Card.Title>
                    <Card.Text>Matthew Stein II</Card.Text>
                  </Card.Body>
                </Card>
                <Card>
                  <Card.Img
                    variant="top"
                    src="/images/user.png"
                    style={{ height: "280px" }}
                  />
                  <Card.Body>
                    <Card.Title>LEAD INSTRUCTOR</Card.Title>
                    <Card.Text>Cole Ellis</Card.Text>
                  </Card.Body>
                </Card>
              </CardGroup>
            </div>
          </div>
        </Container>
      </section>
      <Footer position={"relative"} />
    </div>
  );
}

export default About;
