/* Copyright P. Opiyo @2022 - All rights reserved */
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Body from "../layouts/Body";
import Login from "./Login";
import Register from "./Register";

function Landing() {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Body />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default Landing;
