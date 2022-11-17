/* Copyright P. Opiyo and Joshua Payne @2022 - All rights reserved */
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./components/pages/Admin/Admin";
import Profile from "./components/pages/Profile/Profile";
import Landing from "./components/pages/Landing/Landing";
import Survey from "./components/pages/Survey/Survey";
import About from "./components/pages/About/About";
import SurveySelect from "./components/pages/SurveySelect/SurveySelect";
import NavBar from "./components/layouts/NavBar/NavBar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/survey_submissions/is_logged_in`);

      if (response.status !== 200) {
        console.log("Error status:", response.status);
        throw new Error(`Error! status: ${response.status}`);
      }

      console.log("Response data", response.data);

      setIsLoggedIn(response.data);
    };

    fetchData().catch((err) => {
      console.log(err.message);
    });
  }, []);

  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/organizations/:orgId" element={<Survey />} />
        <Route exact path="/organizations" element={<SurveySelect />} />
        <Route exact path="/organizer" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
