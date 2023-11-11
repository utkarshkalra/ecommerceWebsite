import React from "react";

export const LoginStep = (props) => {
  return (
    <div className=" checkoutStep ">
      <div
        onClick={props.onClick}
        className={`checkoutHeader rounded-3 w-100 login-checkpoint ${
          props.active && "active"
        } ${props.done && "done"}`}
      >
        <div className="me-4">
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
        {props.body && props.body}
      </div>
    </div>
  );
};
