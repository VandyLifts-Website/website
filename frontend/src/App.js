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
import OrganizationSelect from "./components/pages/OrganizationSelect/OrganizationSelect";
import NavBar from "./components/layouts/NavBar/NavBar";
import { getCsrftoken } from "./csrftoken";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

function App() {
  const [userData, setUserData] = useState({
    is_logged_in: undefined,
    is_admin: undefined,
    id: undefined,
    email: undefined,
    first_name: undefined,
    last_name: undefined,
  });

  const [csrftoken, setCsrftoken] = useState(getCsrftoken());

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/api/user/get_user_data/`);

      if (response.status !== 200) {
        console.log("Error status:", response.status);
        throw new Error(`Error! status: ${response.status}`);
      }

      setCsrftoken(getCsrftoken());
      setUserData(response.data);
    };

    fetchData().catch((err) => {
      console.log(err.message);
    });
  }, []);

  return (
    <Router>
      <NavBar userData={userData} csrftoken={csrftoken} />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route
          exact
          path="/profile"
          element={<Profile userData={userData} />}
        />
        <Route exact path="/about" element={<About />} />
        <Route
          exact
          path="/organizations/:orgId"
          element={<Survey userData={userData} />}
        />
        <Route
          exact
          path="/organizations"
          element={<OrganizationSelect pageLink={"organizations"} />}
        />
        <Route exact path="/organizer/:orgId" element={<Admin />} />
        <Route
          exact
          path="/organizer"
          element={<OrganizationSelect pageLink={"organizer"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
