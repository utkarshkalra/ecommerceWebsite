import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetailsById } from "../../actions";
import Layout from "../../components/Layout";
import { IoIosArrowForward, IoIosStar, IoMdCart } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
import { AiFillThunderbolt } from "react-icons/ai";
import { MaterialButton } from "../../components/MaterialUI";
import "./style.css";
import { addToCart } from "../../actions";

const ProductDetailsPage = (props) => {
  const dispatch = useDispatch();
  const [src, setSrc] = useState("");

  const product = useSelector((state) => state.product);
  useEffect(() => {
    console.log("prod page", product);
    if (product?.productDetails?.productPictures)
      setSrc(product?.productDetails?.productPictures[0]);
  }, [product]);

  useEffect(() => {
    const { productId } = props.match.params;
    console.log(props);
    const payload = {
      params: {
        productId,
      },
    };
    dispatch(getProductDetailsById(payload));
  }, []);

  if (Object.keys(product.productDetails)?.length === 0) {
    return null;
  }

  return (
    <Layout>
      {/* <div>{product.productDetails.name}</div> */}
      <div className="productDescriptionContainer flex-column flex-lg-row">
        <div className="flex-column">
          <div className="productDescContainer">
            <div className="productDescImgContainer">
              <img src={src} alt={`product image`} />
            </div>
            <div className="flex-row horizontalImageStack">
              {product.productDetails?.productPictures?.map((picture) => (
                <div
                  className={src === picture ? "thumbnail active" : "thumbnail"}
                  onClick={() => setSrc(picture)}
                >
                  <img src={picture} alt="prod" />
                </div>
              ))}
            </div>

            {/* action buttons */}
            <div className="btn-container">
              <div className="price-desc">
                <span className="price">
                  <BiRupee />
                  {product.productDetails.price}
                </span>
              </div>
              <button
                className="addToCartBtn"
                onClick={() => {
                  const { _id, name, price } = product.productDetails;
                  const img = product.productDetails.productPictures[0];
                  dispatch(addToCart({ _id, name, price, img }));
                  props.history.push(`/cart`);
                }}
              >
                ADD TO CART
                <IoMdCart />
              </button>
            </div>
          </div>
        </div>
        <div className="m-4">
          {/* home > category > subCategory > productName */}
          <div className="breed">
            <ul>
              <li>
                <a href="/" style={{ color: "red" }}>
                  Home
                </a>
                <IoIosArrowForward />
              </li>

              <li>
                <a href="#">{product.productDetails.name}</a>
              </li>
            </ul>
          </div>
          {/* product description */}
          <div className="productDetails">
            <h1>{product.productDetails.name}</h1>
            <ul>
              <li
                style={{
                  display: "list-item",
                  listStyle: "disc",
                  color: "#212121",
                }}
              >
                {product.productDetails.description}
              </li>
            </ul>

            <div>
              <span className="ratingCount">
                4.3 <IoIosStar />
              </span>
              <span className="ratingNumbersReviews">
                700 Ratings & 80 Reviews
              </span>
            </div>
            {/* <div className="extraOffer">
              Extra <BiRupee />
              4500 off{" "}
            </div> */}
            {/* <div className="flexRow priceContainer">
              <span className="discount" style={{ margin: "0 10px" }}>
                22% off
              </span>
              {/* <span>i</span>
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailsPage;
