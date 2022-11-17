/* Copyright P. Opiyo @2022 - All rights reserved */
import React from "react";


function SignIn() {

  return (
    <div>
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-6 col-xl-5">
            <form
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
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
