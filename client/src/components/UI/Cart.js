import React from "react";
import { IoIosCart } from "react-icons/io";

const Cart = (props) => {
  return (
    <div
      style={{ fontSize: "2rem", left: "7px" }}
      className="d-flex align-item-center justify-content-center position-relative "
    >
      <span
        style={{
          position: "absolute",
          background: "red",
          width: "20px",
          height: "20px",
          borderRadius: "5px",
          fontSize: "14px",
          border: "1px solid #fff",
          textAlign: "center",
          alignSelf: "center",
          top: "-15px",
          right: "-20px",
        }}
      >
        {props.count}
      </span>
      <IoIosCart />
    </div>
  );
};

export default Cart;
