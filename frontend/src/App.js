/* Copyright P. Opiyo @2022 - All rights reserved */
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./components/pages/Profile/Profile";
import SignIn from "./components/pages/SignIn/SignIn";
import Landing from "./components/pages/Landing/Landing";
import Survey from "./components/pages/Survey/Survey";
import About from "./components/pages/About/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/survey" element={<Survey />} />
        <Route exact path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
