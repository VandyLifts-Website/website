/* Copyright P. Opiyo @2022 - All rights reserved */
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/pages/Profile/Profile";
import SignIn from "./components/pages/SignIn/SignIn";
import Landing from "./components/pages/Landing/Landing";
// import Survey from "./components/pages/Survey/Survey";
import About from "./components/pages/About/About";
import SurveySelect from "./components/pages/SurveySelect/SurveySelect";
import Mentor from "./components/pages/Mentor/Mentor";
import Mentee from "./components/pages/Mentee/Mentee";
import Buddy from "./components/pages/Buddy/Buddy";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/survey/mentor" element={<Mentor />} />
        <Route exact path="/survey/mentee" element={<Mentee />} />
        <Route exact path="/survey/buddy" element={<Buddy />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/surveys" element={<SurveySelect />} />
      </Routes>
    </Router>
  );
}

export default App;
