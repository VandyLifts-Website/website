/* Copyright P. Opiyo @2022 - All rights reserved */
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../layouts/NavBar/NavBar";

function SignIn() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/profile");
  };

  function handleCallBackResponse(res) {
    console.log("Encoded JWT Token: " + res.credential);
  };
  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id: "381841134579-jcch1ags5re1siuu45lsjnr24st1fnj5.apps.googleusercontent.com",
      callback: handleCallBackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    );
  },[]);

  return (
    <div>
      <NavBar isRegister={true} isLogin={false} />
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-6 col-xl-5">
            <form
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
              onSubmit={handleSubmit}
            >
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Sign In</h3>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    id="username"
                    placeholder="Username"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    placeholder="Password"
                  />
                </div>
                <button
                  className="btn btn-outline-success form-control mb-4"
                  id="submitBtn"
                  type="submit"
                >
                  Sign In
                </button>
                <div id="signInDiv">
                  
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
