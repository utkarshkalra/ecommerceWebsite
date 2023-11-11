import React from "react";
import Footer from "../Footer/index.footer";
import Header from "../Header";

const Layout = (props) => {
  return (
    <>
      <Header />
      {props.children}
      <Footer />
    </>
  );
};

export default Layout;
