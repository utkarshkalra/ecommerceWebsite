import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import Carousel from "react-bootstrap/Carousel";

import Icon from "./Icon";

import slide1 from "../../images/1.png";
import slide2 from "../../images/2.png";
import slide3 from "../../images/3.png";
import slide4 from "../../images/4.png";
import slide1_M from "../../images/mobile_carousel/1.png";
import slide2_M from "../../images/mobile_carousel/2.png";
import slide3_M from "../../images/mobile_carousel/3.png";
import slide4_M from "../../images/mobile_carousel/4.png";

import "./style.home.css";
import Categories from "../../components/Categories/index.categories";

import HomePageProducts from "../ProductListPage/AllProducts/HomepageProducts";

import HomePageAbout from "../../components/HomePageAbout";

const HomePage = (props) => {
  return (
    <Layout>
      <>
        <Carousel>
          <Carousel.Item interval={750}>
            <picture>
              <source media="(max-width: 720px)" srcset={slide1_M} />
              <source media="(min-width: 721px)" srcset={slide1} />
              <img
                className="d-block w-100"
                src={slide1}
                alt="Chris standing up holding his daughter Elva"
              />
            </picture>
          </Carousel.Item>
          <Carousel.Item interval={750}>
            <picture>
              <source media="(max-width: 720px)" srcset={slide2_M} />
              <source media="(min-width: 721px)" srcset={slide2} />
              <img
                className="d-block w-100"
                src={slide3}
                alt="Chris standing up holding his daughter Elva"
              />
            </picture>
          </Carousel.Item>
          <Carousel.Item interval={750}>
            <picture>
              <source media="(max-width: 720px)" srcset={slide3_M} />
              <source media="(min-width: 721px)" srcset={slide3} />
              <img
                className="d-block w-100"
                src={slide3}
                alt="Chris standing up holding his daughter Elva"
              />
            </picture>
          </Carousel.Item>
          <Carousel.Item interval={750}>
            <picture>
              <source media="(max-width: 720px)" srcset={slide4_M} />
              <source media="(min-width: 721px)" srcset={slide4} />
              <img
                className="d-block w-100"
                src={slide4}
                alt="Chris standing up holding his daughter Elva"
              />
            </picture>
          </Carousel.Item>
        </Carousel>

        <Icon />
        <Categories />

        <div className="backgroundImg d-none d-lg-block "></div>

        <HomePageProducts />
        <HomePageAbout />
      </>
    </Layout>
  );
};

export default HomePage;
