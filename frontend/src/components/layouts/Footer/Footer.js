/* Copyright P. Opiyo @2022 - All rights reserved */
import React from "react";
import Container from "react-bootstrap/Container";
import { HouseFill, EnvelopeFill, TelephoneFill } from "react-bootstrap-icons";

function Footer(props) {
  return (
    <div
      className="text-center text-lg-start text-muted border-top"
      style={{
        position: `${props.position}`,
        bottom: 0,
        width: "100%",
        backgroundColor: "#F3F3F3",
      }}
    >
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
                <a
                  href="https://anchorlink.vanderbilt.edu/organization/vandylifts"
                  className="text-reset"
                >
                  AnchorLink
                </a>
              </p>
              <p>
                <a
                  href="https://instagram.com/vandylifts_"
                  className="text-reset"
                >
                  Instagram
                </a>
              </p>
              <p>
                <a
                  href="https://groupme.com/join_group/86843176/zdmNe7F1"
                  className="text-reset"
                >
                  GroupMe
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
                melanie.k.leguizamon@vanderbilt.edu
              </p>
              <p>
                <TelephoneFill className="me-3" />+ 1 630-209-4588
              </p>
            </div>
          </div>
        </Container>
      </section>
      <div
        className="text-center p-4"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      >
        Copyright © 2022 VandyLifts. All Rights Reserved.
      </div>
    </div>
  );
}

export default Footer;
