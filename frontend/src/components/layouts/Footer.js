import React from "react";
import Container from "react-bootstrap/Container";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  HouseFill,
  EnvelopeFill,
  TelephoneFill,
} from "react-bootstrap-icons";

function Footer() {
  return (
    <div
      className="text-center text-lg-start text-muted border-top"
      backgroundColor="#F3F3F3"
      style={{ position: "fixed", bottom: 0, width: "100%" }}
    >
      <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>
        <div>
          <a href="#!" className="me-4 text-reset">
            <Facebook />
          </a>
          <a href="#!" className="me-4 text-reset">
            <Twitter />
          </a>
          <a href="#!" className="me-4 text-reset">
            <Instagram />
          </a>
          <a href="#!" className="me-4 text-reset">
            <Linkedin />
          </a>
        </div>
      </section>
      <section>
        <Container className="text-center text-md-start mt-5">
          <div className="row mt-3">
            <div md="3" lg="4" xl="3" className="col mx-auto mb-4 me-5">
              <h6 className="text-uppercase fw-bold mb-4">VandyLifts</h6>
              <p>
                Here you can use rows and columns to organize your footer
                content. Lorem ipsum dolor sit amet, consectetur adipisicing
                elit.
              </p>
            </div>

            <div md="3" lg="2" xl="2" className="col mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
              <p>
                <a href="#!" className="text-reset">
                  Pricing
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Settings
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Orders
                </a>
              </p>
              <p>
                <a href="#!" className="text-reset">
                  Help
                </a>
              </p>
            </div>

            <div md="4" lg="3" xl="3" className="col mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <HouseFill className="me-3" />
                Nashville, TN 37235, US
              </p>
              <p>
                <EnvelopeFill className="me-3" />
                info@example.com
              </p>
              <p>
                <TelephoneFill className="me-3" /> + 01 234 567 88
              </p>
            </div>
          </div>
        </Container>
      </section>
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        © 2022 Copyright:
        <a className="text-reset fw-bold" href="https://mdbootstrap.com/">
          VandyLifts.com
        </a>
      </div>
    </div>
  );
}

export default Footer;
