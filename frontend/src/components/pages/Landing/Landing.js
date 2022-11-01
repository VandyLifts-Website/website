/* Copyright P. Opiyo @2022 - All rights reserved */
import React from "react";
import NavBar from "../../layouts/NavBar/NavBar";
import Footer from "../../layouts/Footer/Footer";

function Landing() {
  return (
    <div>
      <NavBar isLogin={true} isRegister={true} />
      <div className="intro-body">
        <div className="intro">
          <div className="banner">
            Look Fit.
            <br />
            Feel Fit.
          </div>
          <p className="body-paragraph">
            A Premier Weightlifting Mentorship Program, no strings attached
          </p>
        </div>
      </div>
      <section>
        <div
          className="container"
          style={{ marginTop: "80px", backgroundImage: "none" }}
        >
          <div className="row about-extra">
            <div className="col-lg-6 wow fadeInUp">
              <img
                src="/images/trainer.jpg"
                className="img-fluid"
                alt="#"
                style={{ borderRadius: "50px" }}
              />
            </div>
            <div className="col-lg-6 wow fadeInUp pt-5 pt-lg-0">
              <h4 style={{ marginTop: "70px" }}>Become a Mentor!</h4>
              <p>
                Lead, instruct, and motivate others in strength training and
                exercises to achieve their physical fitness goals.
              </p>
            </div>
          </div>

          <div
            className="row about-extra"
            style={{ marginTop: "30px", marginBottom: "30px" }}
          >
            <div className="col-lg-6 wow fadeInUp order-1 order-lg-2">
              <img
                src="/images/trainee.jpg"
                className="img-fluid"
                alt=""
                style={{ borderRadius: "50px" }}
              />
            </div>
            <div className="col-lg-6 wow fadeInUp pt-4 pt-lg-0 order-2 order-lg-1">
              <h4 style={{ marginTop: "40px" }}>Get mentored!</h4>
              <p>
                Don't know where to start? Is your form terrible? Get the
                mentoring and training you need to achieve your goals!
              </p>
            </div>
          </div>

          <div
            className="row about-extra"
            style={{ marginTop: "30px", marginBottom: "50px" }}
          >
            <div className="col-lg-6 wow fadeInUp">
              <img
                src="/images/buddy.jpg"
                className="img-fluid"
                alt="#"
                style={{ borderRadius: "50px" }}
              />
            </div>
            <div className="col-lg-6 wow fadeInUp pt-5 pt-lg-0">
              <h4 style={{ marginTop: "40px" }}>Get a Buddy!</h4>
              <p>
                You want someone to hold you accountable? Someone who will push
                you to reach your fitness goals and expects the same
                encouragement from you? Get a buddy!
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer position={"relative"} />
    </div>
  );
}

export default Landing;
