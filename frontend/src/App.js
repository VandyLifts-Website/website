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
  const [userData, setUserData] = useState({
    is_logged_in: false,
    is_admin: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/user/get_user_data/`);

      if (response.status !== 200) {
        console.log("Error status:", response.status);
        throw new Error(`Error! status: ${response.status}`);
      }

      console.log("Response data", response.data);

      setUserData(response.data);
    };

    fetchData().catch((err) => {
      console.log(err.message);
    });
  }, []);

  return (
    <Router>
      <NavBar userData={userData} />
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
