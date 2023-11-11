import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";
import "./style.css";

const HomePageAbout = () => {
  return (
    <section className=" homepage-about d-flex align-items-center">
      <Container className="text-center" data-aos="fade-up">
        <Row>
          <Col>
            <h1>About us</h1>
          </Col>
        </Row>
        <Row>
          <Col className="mb-4" data-aos="fade-up">
            <span className="count">
              500+ Clients <span className="count2"> and still counting.</span>
            </span>
          </Col>
        </Row>
        <Row>
          <Col data-aos="fade-up" className="quote-icon" md={3}>
            <ImQuotesLeft />
          </Col>

          <Col>
            <p data-aos="fade-up">
              Viplus deal in b2b and b2c and already we have 500+ dealers in the
              Indian marketing and this year we would be deal in international
              market. We have trendy caps and good quality stuff and designing.
            </p>
          </Col>
          <Col data-aos="fade-up" className="quote-icon" md={3}>
            <ImQuotesRight />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomePageAbout;
