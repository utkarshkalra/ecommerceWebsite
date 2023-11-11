import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../actions";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import Price from "../../components/UI/Price";
import { BiRupee } from "react-icons/bi";
import { IoMdCall } from "react-icons/io";
import { ImLocation } from "react-icons/im";
import { FaUserAlt } from "react-icons/fa";
import { Accordion } from "react-bootstrap";

import "./style.css";

const OrderDetailsPage = (props) => {
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.user.orderDetails);

  console.log("orderdetails", orderDetails);
  useEffect(() => {
    console.log({ props });
    const payload = {
      orderId: props.match.params.orderId,
    };
    dispatch(getOrder(payload));
  }, []);

  const formatDate = (date) => {
    if (date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
    }
    return "";
  };

  const formatDate2 = (date) => {
    const month = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    if (date) {
      const d = new Date(date);
      return `${month[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    }
  };

  if (!(orderDetails && orderDetails.address)) {
    return null;
  }

  return (
    <Layout>
      <div className="order-details-container container">
        <div className="row">
          <div className="col-md-8 col-12">
            <div className="d-flex flex-row justify-content-between mt-2">
              <h1 className="order-heading ">Track Order</h1>
              <h1 className="order-heading colored-heading">
                <BiRupee />
                {orderDetails?.totalAmount}
              </h1>
            </div>
            <span>Order Id: &nbsp;{orderDetails._id}</span>
            <div style={{ padding: "25px 30px" }} className="my-4">
              <div className="orderTrack">
                {orderDetails.orderStatus.map((status, index) => (
                  <div
                    key={index}
                    className={`orderStatus ${
                      status.isCompleted ? "active" : ""
                    }`}
                  >
                    <div
                      className={`point ${status.isCompleted ? "active" : ""}`}
                    ></div>
                    <div className="orderInfo">
                      <div
                        className={
                          status.isCompleted ? "status-active" : "status"
                        }
                      >
                        {status.type}
                      </div>
                      {status.date ? (
                        <div className="date">{formatDate(status.date)}</div>
                      ) : (
                        <div className="order-text">
                          {status.type === "packed"
                            ? "We are preparing your order"
                            : status.type === "shipped"
                            ? "We will ship your order soon"
                            : "Pending"}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-12 mt-4">
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Delivery Details</Accordion.Header>
                <Accordion.Body>
                  <div className="delAdrContainer">
                    <div className="delAdrDetails">
                      <div className="delName">
                        {/* <FaUserAlt /> */}
                        {orderDetails.address.name}
                      </div>
                      <div className="delAddress">
                        <ImLocation />
                        {orderDetails.address.address}
                      </div>
                      <div className="delPhoneNumber">
                        <IoMdCall />
                        {orderDetails.address.mobileNumber}
                      </div>
                    </div>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="mt-2">
              <Accordion.Item eventKey="1">
                <Accordion.Header>Order Details</Accordion.Header>
                <Accordion.Body>
                  {orderDetails.items.map((item, index) => (
                    <div
                      onClick={() =>
                        props.history.push(
                          `/${item.productId.name}/${item.productId._id}/p`
                        )
                      }
                      className="ordered-item"
                    >
                      <div className="flexRow">
                        <div className="delItemImgContainer">
                          <img src={item.productId.productPictures[1]} alt="" />
                        </div>
                        <div style={{ width: "250px" }}>
                          <div className="delItemName">
                            {item.productId.name}
                          </div>
                          {item.productId.desc}
                          <span className="order-heading colored-heading">
                            <BiRupee />
                            {item.payablePrice}
                          </span>
                        </div>
                      </div>

                      <div style={{ fontWeight: "500", fontSize: 14 }}>
                        {orderDetails.orderStatus[3].isCompleted &&
                          `Delivered on ${formatDate2(
                            orderDetails.orderStatus[3].date
                          )}`}
                      </div>
                    </div>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetailsPage;
