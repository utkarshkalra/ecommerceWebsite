import React, { useEffect, useState } from "react";
import "./style.css";
import ViplusLogo from "../../images/logo/viplus.svg";

import { Dropdown, Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import {
  Modal,
  MaterialInput,
  MaterialButton,
  DropdownMenu,
} from "../MaterialUI";
import { useDispatch, useSelector } from "react-redux";
import { login, signout, getCartItems, signup as _signup } from "../../actions";
import { IoMdCall } from "react-icons/io";

const Header = (props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [signup, setSignup] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // state cart value

  const userSignup = () => {
    const user = { firstName, lastName, email, password };
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === ""
    ) {
      return;
    }

    dispatch(_signup(user));
  };

  const userLogin = () => {
    if (signup) {
      userSignup();
    } else {
      dispatch(login({ email, password }));
    }
  };

  const logout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (auth.authenticate) {
      setLoginModal(false);
    }
  }, [auth.authenticate]);

  // useEffect(() => {
  //   dispatch(getCartItems());
  // }, []);

  const renderLoggedInMenu = () => {
    return (
      <NavDropdown title={auth.user.fullName} id="basic-nav-dropdown">
        {/* <NavDropdown.Item href="#">My Profile</NavDropdown.Item> */}
        <NavDropdown.Item href="/account/orders">Orders</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#" onClick={logout}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    );
  };

  const newUserNavBar = () => {
    return (
      <a
        className="navbar-login-signup-btn p-2 rounded-2"
        onClick={() => {
          setSignup(false);
          setLoginModal(true);
        }}
        style={{
          background: "var(--brand-color)",
          color: "var(--font-color-2)",
          margin: "5px 22px",
          display: "inline-block",
        }}
      >
        Login/Signup
      </a>
    );
  };

  return (
    <>
      <Navbar
        className="px-2"
        bg="light"
        variant="light"
        expand="md"
        sticky="top"
      >
        <Navbar.Brand
          href="/"
          className="d-flex align-items-center"
          style={{
            fontFamily: "var(--cursive-font)",
            fontSize: "1.8rem",
            fontWeight: "700",
          }}
        >
          <img
            alt="viplus logo"
            src={ViplusLogo}
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
          Viplus
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto px-4">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/photo-gallery">Gallery</Nav.Link>
            <Nav.Link href="/Special-Designer-Caps-aGB1dqgjsi">
              Products
            </Nav.Link>
          </Nav>

          <Navbar.Text>
            {auth.authenticate ? renderLoggedInMenu() : newUserNavBar()}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <div className="header">
        <Modal visible={loginModal} onClose={() => setLoginModal(false)}>
          <div className="authContainer">
            <div className="row">
              {/* <div className="leftspace  col-sm-12 col-md-6">
                <img
                  src={ViplusLogo}
                  alt="viplus logo"
                  style={{ width: "90px" }}
                />
                <h2>Login</h2>
                <p>Get access to your Orders, Cart</p>
              </div> */}
              <div className="rightspace  col">
                <img
                  src={ViplusLogo}
                  alt="viplus logo"
                  style={{ width: "90px" }}
                />
                <div className="loginInputContainer">
                  {/* {auth.error && (
                    <div style={{ color: "red", fontSize: 12 }}>
                      {auth.error}
                    </div>
                  )} */}
                  {signup && (
                    <MaterialInput
                      type="text"
                      label="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  )}
                  {signup && (
                    <MaterialInput
                      type="text"
                      label="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  )}

                  <MaterialInput
                    type="text"
                    label="Email/Mobile Number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MaterialInput
                    type="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    // rightElement={<a href="#">Forgot?</a>}
                  />
                  <MaterialButton
                    title={signup ? "Register" : "Login"}
                    bgColor="var(--brand-color)"
                    textColor="#ffffff"
                    style={{
                      margin: "40px 0 20px 0",
                    }}
                    onClick={userLogin}
                  />

                  {!signup ? (
                    <p className="m-4 text-center w-75 mx-auto">
                      Don't have an account ?
                      <span
                        onClick={() => {
                          setLoginModal(true);
                          setSignup(true);
                        }}
                        style={{ color: "#2874f0", cursor: "pointer" }}
                      >
                        Sign Up
                      </span>
                    </p>
                  ) : (
                    <p className="m-4 text-center w-75 mx-auto">
                      Already a User ?
                      <span
                        onClick={() => {
                          setSignup(false);
                          setLoginModal(true);
                        }}
                        style={{ color: "#2874f0", cursor: "pointer" }}
                      >
                        Login
                      </span>
                    </p>
                  )}
                  <div className="w-50 m-auto text-danger">
                    <i>
                      <IoMdCall />
                    </i>
                    <a
                      href="#"
                      style={{ color: "var(--brand-color)", fontWeight: "800" }}
                    >
                      +91 9922334455
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default Header;
