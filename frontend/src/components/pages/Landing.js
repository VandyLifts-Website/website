/* Copyright P. Opiyo @2022 - All rights reserved */
import React from "react";
import NavBar from "../layouts/NavBar";
import Footer from "../layouts/Footer";

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
            Pair up with another Vanderbilt Student to keep yourself accountable
            and maximize workout experience
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
