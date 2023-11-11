import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySlug } from "../../../actions";
import "./style.product.css";

import { BiRupee } from "react-icons/bi";
import { BsFilterLeft } from "react-icons/bs";
import { IoMdCart } from "react-icons/io";
import { AiFillStar } from "react-icons/ai";

import { getAllCategoryUser } from "../../../actions";

// import "./style.category.css";

import Loading from "../../../components/UI/Loading/loading";

import { MaterialButton } from "../../../components/MaterialUI";
import { addToCart } from "../../../actions";

import { Alert, Spinner } from "react-bootstrap";

const NoProductsFound = () => {
  return (
    <div className="loading-div">
      <h1 className="Noprod">
        There are presently no products in selected category.
      </h1>
      <a href="/">go back</a>
    </div>
  );
};
const arr = [1, 2, 3, 4, 5, 6];

const AllProducts = (props) => {
  const product = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const [showFilter, setShowFilter] = useState(false);
  const { match } = props;

  useEffect(() => {
    dispatch(getProductsBySlug(match.params.slug));
  }, []);

  useEffect(() => {
    console.log("allProducts", product);
    console.log("allProducts", cart);
  }, [cart]);

  useEffect(() => {
    !cart.updatingCart &&
      setTimeout(() => {
        setShowAlert(false);
      }, 2500);
  }, [cart]);

  const categoryUser = useSelector((state) => state.categoryUser);

  useEffect(() => {
    dispatch(getAllCategoryUser());
  }, []);

  return (
    <>
      {showAlert && (
        <div className="alerts">
          {cart.updatingCart ? (
            <Alert variant="secondary">
              <Spinner animation="border" role="status" className="mx-2">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              Adding to cart ...
            </Alert>
          ) : (
            <Alert variant="success">Added to cart </Alert>
          )}
        </div>
      )}
      {product?.productRequest ? (
        <Loading />
      ) : product?.products?.length > 0 &&
        categoryUser.categoriesUser?.length > 0 ? (
        <>
          <div className="gallery-container">
            <div className="gallery">
              <h1>Products</h1>
              <div>
                <a className="prev" href="/">
                  Home&nbsp;
                </a>{" "}
                <span> {">"} </span>
                <a href="#"> &nbsp; Products</a>
              </div>
            </div>
          </div>
          <button
            className="filter-btn outside-filter-btn"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filters
            <BsFilterLeft />
          </button>
          <div className="product-container p-4">
            <div
              className={
                showFilter
                  ? "product-category-div show"
                  : "product-category-div"
              }
            >
              <button className="filter-btn">
                Filters
                <BsFilterLeft />
              </button>
              {categoryUser.categoriesUser.map((element, index) => {
                if (element.categoryImage) {
                  return (
                    <a key={index} href={`/${element.slug}?cid=${element._id}`}>
                      <span
                        className={
                          element.slug === match.params.slug
                            ? "active-category product-category"
                            : "product-category"
                        }
                      >
                        {element.name}
                      </span>
                    </a>
                  );
                }
              })}
            </div>
            <div class="row allproduct ms-0 ms-md-4">
              {product?.products.map((prod, index) => {
                return (
                  <div
                    key={index}
                    class="col-lg-4 col-md-6 my-2"
                    data-aos="zoom-in"
                  >
                    <div class="product-grid gap-1 rounded-3">
                      <div class="product-image">
                        <a href={`/${prod.slug}/${prod._id}/p`} class="image">
                          <img class="pic-1" src={prod.productPictures[0]} />
                          <img class="pic-2" src={prod.productPictures[1]} />
                        </a>
                      </div>
                      <div class="product-content">
                        <h3 class="title">
                          <a href="#">{prod.name}</a>
                        </h3>
                        <p>{prod.description.substring(0, 30) + "..."}</p>
                        <div className="d-flex justify-content-between align-items-center">
                          <div class="price">
                            <BiRupee />
                            {prod.price}
                          </div>
                          <ul class="rating d-flex">
                            <li>
                              <AiFillStar />
                            </li>
                            <li>
                              <AiFillStar />
                            </li>
                            <li>
                              <AiFillStar />
                            </li>
                            <li>
                              <AiFillStar />
                            </li>
                            <li>
                              <AiFillStar />
                            </li>
                          </ul>
                        </div>
                        <div className="flexRow">
                          <MaterialButton
                            title="ADD TO CART"
                            bgColor="#ff9f00"
                            textColor="#ffffff"
                            style={{
                              marginRight: "5px",
                            }}
                            icon={<IoMdCart />}
                            onClick={() => {
                              const { _id, name, price } = prod;
                              const img = prod.productPictures[0];
                              setShowAlert(true);
                              dispatch(addToCart({ _id, name, price, img }));
                            }}
                          />
                          {/* <MaterialButton
                          title="BUY NOW"
                          bgColor="#fb641b"
                          textColor="#ffffff"
                          style={{
                            marginLeft: "5px",
                          }}
                          icon={<AiFillThunderbolt />}
                        /> */}
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                );
              })}
                          
            </div>
          </div>
        </>
      ) : (
        <NoProductsFound />
      )}
    </>
  );
};

export default AllProducts;
