import React from "react";
import { Container } from "react-bootstrap";
import contact from "../../images/contact-medium.jpeg";
import Layout from "../../components/Layout";
import "./style.contact.css";
import { ImLocation } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";

import {
  TiSocialInstagram,
  TiSocialFacebook,
  TiSocialTwitter,
} from "react-icons/ti";
const ContactPage = () => {
  return (
    <Layout>
      <div className="gallery-container">
        <div className="gallery">
          <h1>Contact Us</h1>
          <div>
            <a className="prev" href="/">
              Home&nbsp;
            </a>{" "}
            <span> {">"} </span>
            <a href="#"> &nbsp; Contact us</a>
          </div>
        </div>
      </div>
      <div className="contact-container">
        <Container>
          <div className="contact d-flex flex-row flex-md-row justify-content-center h-100">
            <div className="contact-left d-none d-md-block">
              <img src={contact} alt="contact us" />
            </div>
            <div className="contact-right">
              <p>
                Want to get in touch? We'd love to hear from you. Here's how you
                can reach us ➡️
              </p>

              <div className="links">
                <ul>
                  <li data-aos="fade-right">
                    <i>
                      <IoMdCall />
                    </i>
                    <a href="">+91 9922334455</a>
                  </li>
                  <li data-aos="fade-left">
                    <i>
                      <MdEmail />
                    </i>
                    <a href="">utkarshkalra.2001@gmail.com</a>
                  </li>
                  <li data-aos="fade-right">
                    <i>
                      <TiSocialFacebook />
                    </i>
                    <a href="https://www.facebook.com/" target="_blank">
                      Facebook
                    </a>
                  </li>
                  <li data-aos="fade-left">
                    <i>
                      <TiSocialInstagram />
                    </i>
                    <a
                      href="https://instagram.com/utkarshxkalra?utm_medium=copy_link"
                      target="_blank"
                    >
                      Instagram
                    </a>
                  </li>{" "}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Layout>
  );
};

export default ContactPage;
