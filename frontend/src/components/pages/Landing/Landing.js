/* Copyright P. Opiyo @2022 - All rights reserved */
import React from "react";
import Footer from "../../layouts/Footer/Footer";

function Landing() {
  return (
    <div>
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
                src="/images/mentee.png"
                className="img-fluid"
                alt="#"
                style={{ borderRadius: "50px" }}
              />
            </div>
            <div className="col-lg-6 wow fadeInUp pt-4 pt-lg-0">
              <h4 style={{ marginTop: "70px" }}>Become a Mentee!</h4>
              <p>
                Scared to begin working out in the gym? Not sure how to get
                started or how to reach your goals? Fill out a mentee
                application to get paired with an experienced mentor at the
                school and learn the ropes. VandyLifts is here to match you with
                someone who shares your interests, preferences, and goals when
                it comes to working out.
              </p>
            </div>
          </div>

          <div
            className="row about-extra"
            style={{ marginTop: "30px", marginBottom: "30px" }}
          >
            <div className="col-lg-6 wow fadeInUp order-1 order-lg-2">
              <img
                src="/images/mentor.png"
                className="img-fluid"
                alt=""
                style={{ borderRadius: "50px" }}
              />
            </div>
            <div className="col-lg-6 wow fadeInUp pt-4 pt-lg-0 order-2 order-lg-1">
              <h4 style={{ marginTop: "40px" }}>Become a Mentor!</h4>
              <p>
                Want to teach other students what you know and share your
                passion? Fill out a mentor application to be paired with one or
                multiple mentees to empower them to lift and be comfortable at
                the rec. Once approved by an already established mentor, you’ll
                be on your way to training students to reach their goals.
              </p>
            </div>
          </div>

          <div
            className="row about-extra"
            style={{ marginTop: "30px", marginBottom: "50px" }}
          >
            <div className="col-lg-6 wow fadeInUp">
              <img
                src="/images/buddy.png"
                className="img-fluid"
                alt="#"
                style={{ borderRadius: "50px" }}
              />
            </div>
            <div className="col-lg-6 wow fadeInUp pt-5 pt-lg-0">
              <h4 style={{ marginTop: "40px" }}>Become a Buddy!</h4>
              <p>
                Want accountability at the rec? Want someone to lift with, but
                don’t need a person to teach you and do not want to train others
                just yet? Fill out a buddy application to be paired with another
                student who will become your go-to workout partner.
              </p>
            </div>
          </div>

          <div
            className="row about-extra"
            style={{ marginTop: "30px", marginBottom: "30px" }}
          >
            <div className="col-lg-6 wow fadeInUp order-1 order-lg-2">
              <img
                src="/images/dayinlife.png"
                className="img-fluid"
                alt=""
                style={{ borderRadius: "50px" }}
              />
            </div>
            <div className="col-lg-6 wow fadeInUp pt-4 pt-lg-0 order-2 order-lg-1">
              <h4 style={{ marginTop: "40px" }}>Get mentored!</h4>
              <p>
                Not sure if you want to commit to going to the gym consistently
                yet? Have a schedule that is too variable that you don’t have a
                set time to lift weekly? Fill out the Day in the Life of a
                Lifter application and be either a “mentor” or “mentee” for a
                one-trial run of what it’s like to train or be trained. This
                means absolutely ZERO commitment to continue training with your
                partner after that. We make these pairings weekly, so you can
                fill out the form as many times as you’d like until you are
                ready to commit to being a mentee, mentor, or buddy.
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
