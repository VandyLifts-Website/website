import React from "react";
import NavigationBar from "../layouts/NavigationBar";
import Footer from "../layouts/Footer";

function LandingPage() {
  return (
    <div>
      <NavigationBar />
      <section className="landing-body"></section>
      <Footer />
    </div>
  );
}

export default LandingPage;
