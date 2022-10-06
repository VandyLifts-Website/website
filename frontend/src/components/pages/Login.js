/* Copyright P. Opiyo @2022 - All rights reserved */
import React from "react";
import NavBar from "../layouts/NavBar";

function Login() {
  return (
    <div className="login-body">
      <NavBar isRegister={true} isLogin={false} />
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-6 col-xl-5">
            <form
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
              action="/login"
              method="post"
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
                  className="btn btn-outline-success btn-block"
                  id="submitBtn"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
