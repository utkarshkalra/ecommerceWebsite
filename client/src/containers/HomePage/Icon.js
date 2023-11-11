import { GiRabbit, GiGreenhouse, GiHand, GiIndianPalace } from "react-icons/gi";
import React from "react";

const Icon = () => {
  const iconClass =
    "d-flex align-items-center flex-row flex-lg-column m-2 icon-div";
  return (
    <div className="icons d-flex w-90 justify-content-around mb-4 p-2 shadow">
      <div className={iconClass}>
        <div className="icon" data-aos="fade-right">
          <GiRabbit />
        </div>
        <span className="m-2">Cruelty free</span>
      </div>
      <div className={iconClass}>
        <div className="icon" data-aos="fade-right">
          <GiIndianPalace />
        </div>
        <span className="m-2">Made in India</span>
      </div>
      <div className={iconClass}>
        <div className="icon" data-aos="fade-left">
          <GiHand />
        </div>
        <span className="m-2">Hand Crafted</span>
      </div>

      <div className={iconClass}>
        <div className="icon" data-aos="fade-left">
          <GiGreenhouse />
        </div>
        <span className="m-2">Eco-friendly</span>
      </div>
    </div>
  );
};

export default Icon;
