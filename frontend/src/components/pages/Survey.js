//Joshua Payne
import React from "react"
import NavBar from "../layouts/NavBar"



function Survey () {
    return(
        <>
        <NavBar isRegister={false} isLogin={false} />
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-6 col-xl-5">
              <form
                className="card shadow-2-strong"
                style={{ borderRadius: "1rem" }}
                action="/survey"
                method="post"
              >
                <div className="card-body p-5 text-center">
                  <h3 className="mb-5">Mentor Survey</h3>
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
                      type="text"
                      className="form-control"
                      name="lift_style"
                      id="lift_style"
                      placeholder="Lifting Style (Olympic, General, Power)"
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      className="form-control"
                      name="sex"
                      id="sex"
                      placeholder="Sex(Male, Female)"
                    />
                  </div>
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