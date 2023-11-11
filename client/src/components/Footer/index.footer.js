import React, { useEffect } from "react";
import "./style.footer.css";
import { FiSend } from "react-icons/fi";
import logo from "../../images/logo/viplus.svg";

import { ImLocation } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";

import { TiSocialInstagram, TiSocialFacebook } from "react-icons/ti";
const Footer = () => {
  return (
    <footer className="w-100">
      <div className="container shadow rounded-3 footer py-4">
        <div className="row gy-4 gx-5">
          <div className="col-lg-3 col-md-6 logo">
            <img src={logo} alt="logo" data-aos="fade-up" />

            <p className="small text-muted" data-aos="fade-up">
              Welcome To Viplus ! If you are worried To select which Islamic
              topi is suitable for you then you have came to the right place.
              Viplus offers all latest and trending caps collection. Peoples
              have different choice of caps hence we make sure to provide
              updated and unique designs.
            </p>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className=" mb-3">Contact Us at:</h5>
            <ul className="list-unstyled text-muted">
              <li data-aos="fade-up">
                <IoMdCall />
                <a href="#">99XXX9999</a>
              </li>
              <li data-aos="fade-up">
                <MdEmail />
                <a href="mailto:utkarshkalra.2001@gmail.com">
                  utkarshkalra.2001@gmail.com
                </a>
              </li>
              <li data-aos="fade-up">
                <ImLocation />
                <a href="#">Manufacturing Factory in Manesar</a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6">
            <h5 className=" mb-3">Our Socials</h5>
            <ul className="list-unstyled text-muted">
              <li data-aos="fade-up">
                <TiSocialInstagram />{" "}
                <a
                  href="https://instagram.com/utkarshxkalra?utm_medium=copy_link"
                  target="_blank"
                >
                  Instagram
                </a>
              </li>
              <li data-aos="fade-up">
                <TiSocialFacebook />
                <a href="https://www.facebook.com/" target="_blank">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6" data-aos="fade-up">
            <h5 className=" mb-3">Have any query?</h5>
            <p className="small text-white">Let us know.</p>
            <form action="#">
              <div class="form-floating ">
                <textarea
                  class="form-control"
                  placeholder="Leave a comment here"
                  id="floatingTextarea2"
                  style={{ height: "100px" }}
                ></textarea>
                <label for="floatingTextarea2">Your Query</label>
                <button
                  className="btn btn-send"
                  id="button-addon2"
                  type="button"
                >
                  Send
                  <FiSend />
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row text-center">
          <p className="small text-muted mb-0">
            &copy; Copyrights. All rights reserved.{" "}
            <a className="text-primary" href="#">
              Viplus
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
