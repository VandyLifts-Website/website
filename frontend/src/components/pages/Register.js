/* Copyright P. Opiyo @2022 - All rights reserved */
import React from "react";
import NavBar from "../layouts/NavBar";

function Register() {
  return (
    <>
      <NavBar isRegister={false} isLogin={true} />
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-6 col-xl-5">
            <form
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
              action="/register"
              method="post"
            >
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Sign Up</h3>
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
                    type="text"
                    className="form-control"
                    name="first_name"
                    id="first_name"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    className="form-control"
                    name="last_name"
                    id="last_name"
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    className="form-control"
                    name="primary_email"
                    id="primary_email"
                    placeholder="Email Address"
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
                <div className="form-check d-flex justify-content-start mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    uncheked="true"
                  />
                  <label className="form-check-label ms-2">
                    Remember Password
                  </label>
                </div>
                <button
                  className="btn btn-outline-primary btn-block"
                  id="submitBtn"
                  type="submit"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
