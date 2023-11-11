import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import "../../components/HomePageAbout/style.css";
import Layout from "../../components/Layout";

const About = () => {
  return (
    <Layout>
      <div className="gallery-container">
        <div className="gallery">
          <h1>About Viplus</h1>
          <div>
            <a className="prev" href="/">
              Home&nbsp;
            </a>{" "}
            <span> {">"} </span>
            <a href="#"> &nbsp; About</a>
          </div>
        </div>
      </div>
      <section className="m-4 homepage-about d-flex align-items-center">
        <Container style={{ marginBottom: "100px" }} className="text-center ">
          <Row className="align-items-center mb-4" data-aos="fade-right">
            <Col md={6} sm={12}>
              <span className="count">
                Our
                <span className="count2"> Mission</span>
              </span>
            </Col>
            <Col>
              <p className="text-start">
                There's this notion that to grow a business, you have to be
                ruthless. But we know there's a better way to grow. One where
                what's good for the bottom line is also good for customers.Our
                Mission is to be an international brand. We have trendy caps and
                good quality stuff and designing.
              </p>
            </Col>
          </Row>

          <Row
            className="align-items-center mb-4 flex-column-reverse flex-md-row"
            data-aos="fade-left"
          >
            <Col md={6}>
              <p className="text-start text-md-end">
                Viplus deals in b2b and b2c. We started as a small business.
                Then because of our hardwork and patience we were able to thrive
                in this industry. Presently we have 500+ dealers in the Indian
                marketing. Our customers are our top priority.
              </p>
            </Col>
            <Col md={6}>
              <span className="count">
                Our
                <span className="count2"> Story</span>
              </span>
            </Col>
          </Row>
          <Row className="align-items-center mb-4" data-aos="fade-right">
            <Col md={6}>
              <span className="count">
                Our
                <span className="count2"> Founder</span>
              </span>
            </Col>
            <Col md={6}>
              <p className="text-start">
                We’re a team of around 15 people (and one pupper), all working
                out of the Little’s factory in Devon where we make and pack all
                of your coffee. The humans, not the pupper.
              </p>
            </Col>
          </Row>
          <Row data-aos="fade-up">
            <Col className="m-4">
              <span className="count">
                500+ Clients{" "}
                <span className="count2"> and still counting.</span>
              </span>
            </Col>
          </Row>
        </Container>
      </section>
    </Layout>
  );
};

export default About;
