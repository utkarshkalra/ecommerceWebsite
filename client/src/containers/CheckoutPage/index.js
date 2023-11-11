import React, { useEffect, useState } from "react";
import axios from "../../helpers/axios";

import { useDispatch, useSelector } from "react-redux";
import { addOrder, getAddress, getCartItems, updateOrder } from "../../actions";
import Layout from "../../components/Layout";
import {
  Anchor,
  MaterialButton,
  MaterialInput,
} from "../../components/MaterialUI";
import PriceDetails from "../../components/PriceDetails";
import Card from "../../components/UI/Card";
import CartPage from "../CartPage";
import AddressForm from "./AddressForm";
import razorpayLogo from "../../images/logo/razorpay.svg";
import { LoginStep } from "./helperComponent";

import "./style.css";

const CheckoutStep = (props) => {
  return (
    <div className="checkoutStep">
      <div
        onClick={props.onClick}
        className={`checkoutHeader rounded-3 ${props.active && "active"} ${
          props.done && "done"
        }`}
      >
        <div>
          <span className="stepNumber">{props.stepNumber}</span>
          <span className="stepTitle">{props.title}</span>
        </div>
        {props.msg && props.msg}
      </div>
      {props.body && props.body}
    </div>
  );
};

const Address = ({
  adr,
  selectAddress,
  enableAddressEditForm,
  confirmDeliveryAddress,
  onAddressSubmit,
}) => {
  return (
    <div className="flexRow addressContainer">
      <div>
        <input name="address" onClick={() => selectAddress(adr)} type="radio" />
      </div>
      <div className="flexRow sb addressinfo">
        {!adr.edit ? (
          <div style={{ width: "100%" }}>
            <div className="addressDetail">
              <div>
                <span className="addressName">{adr.name}</span>
                <span className="addressType">{adr.addressType}</span>
                <span className="addressMobileNumber">{adr.mobileNumber}</span>
              </div>
              {adr.selected && (
                <Anchor
                  name="EDIT"
                  onClick={() => enableAddressEditForm(adr)}
                  style={{
                    fontWeight: "500",
                    color: "#2874f0",
                  }}
                />
              )}
            </div>
            <div className="fullAddress">
              {adr.address} <br /> {`${adr.state} - ${adr.pinCode}`}
            </div>
            {adr.selected && (
              <button
                onClick={() => confirmDeliveryAddress(adr)}
                className="deliver-btn"
              >
                Deliver here
              </button>
            )}
          </div>
        ) : (
          <AddressForm
            withoutLayout={true}
            onSubmitForm={onAddressSubmit}
            initialData={adr}
            onCancel={() => {}}
          />
        )}
      </div>
    </div>
  );
};

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
};

const CheckoutPage = (props) => {
  const user = useSelector((state) => state.user);
  const auth = useSelector((state) => state.auth);
  const [newAddress, setNewAddress] = useState(false);
  const [address, setAddress] = useState([]);
  const [confirmAddress, setConfirmAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSummary, setOrderSummary] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState(false);
  const [paymentOption, setPaymentOption] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const displayRazorpay = async () => {
    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay fails to load, please check your internet connection");
      return;
    }

    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      },
      0
    );
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));
    const payload = {
      orderId: user.placedOrderId,
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: "cod",
    };

    const orderData = await axios.post(`/razorpay`, payload);

    console.log("user address ====> -=p=p=p=p=p=p=p=", auth.user);

    var options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID,
      amount: orderData.data.amount,
      currency: orderData.data.currency,
      name: "Viplus Caps",
      description: "Greast caps",
      image:
        "https://res.cloudinary.com/viplus/image/upload/v1635443168/viplus_mlvd4f.svg",
      order_id: orderData.data.id,
      handler: function (response) {
        console.log(response);
        setPaymentVerified(true);
        console.log(
          response.razorpay_payment_id,
          response.razorpay_order_id,
          response.razorpay_signature
        );
        alert("payment successful");
        onConfirmPayment(true);
      },
      prefill: {
        name: auth.user.fullName,
        email: auth.user.email,
        contact: selectedAddress.mobileNumber,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#e00e21",
      },
    };
    var paymentObject = new window.Razorpay(options);
    paymentObject.on("payment.failed", function (response) {
      console.log(response, response.error);
      setPaymentVerified(false);
      alert("Payment Failed", response.error.code, response.error.description);
      console.log(
        response.error.source,
        response.error.step,
        response.error.reason,
        response.error.metadata.order_id,
        response.error.metadata.payment_id
      );
      onConfirmPayment(false);
    });

    paymentObject.open();
  };

  const onAddressSubmit = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const selectAddress = (addr) => {
    //console.log(addr);
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id
        ? { ...adr, selected: true }
        : { ...adr, selected: false }
    );
    setAddress(updatedAddress);
  };

  const confirmDeliveryAddress = (addr) => {
    setSelectedAddress(addr);
    setConfirmAddress(true);
    setOrderSummary(true);
  };

  const enableAddressEditForm = (addr) => {
    const updatedAddress = address.map((adr) =>
      adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
    );
    setAddress(updatedAddress);
  };

  const userOrderConfirmation = () => {
    setOrderConfirmation(true);
    setOrderSummary(false);
    setPaymentOption(true);
  };

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      },
      0
    );
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: "cod",
    };

    console.log(payload);
    dispatch(addOrder(payload));
    setConfirmOrder(true);
  };

  const onConfirmPayment = (paymentDone) => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { price, qty } = cart.cartItems[key];
        return totalPrice + price * qty;
      },
      0
    );
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].price,
      purchasedQty: cart.cartItems[key].qty,
    }));
    const payload = {
      addressId: selectedAddress._id,
      totalAmount,
      items,
      paymentStatus: paymentDone ? "completed" : "pending",
      paymentType: "razorpay",
      orderId: user.placedOrderId,
    };

    dispatch(updateOrder(payload));
  };

  useEffect(() => {
    auth.authenticate && dispatch(getAddress());
    auth.authenticate && dispatch(getCartItems());
  }, [auth.authenticate]);

  useEffect(() => {
    const address = user.address.map((adr) => ({
      ...adr,
      selected: false,
      edit: false,
    }));
    setAddress(address);
    //user.address?.length === 0 && setNewAddress(true);
  }, [user.address]);

  // useEffect(() => {
  //   if (confirmOrder && user.placedOrderId ) {
  //     props.history.push(`/order_details/${user.placedOrderId}`);
  //   }
  // }, [user.placedOrderId]);

  useEffect(() => {
    if (confirmOrder && user.placedOrderId && paymentVerified) {
      props.history.push(`/order_details/${user.placedOrderId}`);
    }
  }, [user.placedOrderId, paymentVerified]);

  return (
    <Layout>
      <div className="cartCheckoutContainer flex-column flex-md-row">
        <div className="checkoutContainer">
          {/* check if user logged in or not */}
          <CheckoutStep
            stepNumber={"1"}
            title={"LOGIN"}
            active={!auth.authenticate}
            done={auth.authenticate}
            msg={
              auth.authenticate ? (
                <div className="msg-div">
                  <span style={{ fontWeight: 500 }}>{auth.user.fullName}</span>
                  <span style={{ margin: "0 5px" }}>{auth.user.email}</span>
                </div>
              ) : (
                <div className="msg-div">
                  <span>
                    Please Login or Create an account to place an order
                  </span>
                </div>
              )
            }
          />
          <CheckoutStep
            stepNumber={"2"}
            title={"DELIVERY ADDRESS"}
            active={!confirmAddress && auth.authenticate}
            done={confirmAddress && auth.authenticate}
            msg={
              <div className="msg-div">
                {!confirmAddress ? (
                  <span> Please Chose a delivery Address</span>
                ) : (
                  <span>Selected</span>
                )}
              </div>
            }
            body={
              <>
                {confirmAddress ? (
                  <div className="stepCompleted">{`${selectedAddress.name} ${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                ) : (
                  address.map((adr) => (
                    <Address
                      selectAddress={selectAddress}
                      enableAddressEditForm={enableAddressEditForm}
                      confirmDeliveryAddress={confirmDeliveryAddress}
                      onAddressSubmit={onAddressSubmit}
                      adr={adr}
                    />
                  ))
                )}
              </>
            }
          />

          {/* AddressForm */}
          {confirmAddress ? null : newAddress ? (
            <AddressForm onSubmitForm={onAddressSubmit} onCancel={() => {}} />
          ) : auth.authenticate ? (
            <CheckoutStep
              stepNumber={"+"}
              title={"ADD NEW ADDRESS"}
              active={false}
              onClick={() => setNewAddress(true)}
            />
          ) : null}

          <CheckoutStep
            stepNumber={"3"}
            title={"ORDER SUMMARY"}
            active={orderSummary}
            done={orderConfirmation && auth.authenticate}
            body={
              orderSummary ? (
                <CartPage onlyCartItems={true} />
              ) : orderConfirmation ? (
                <div className="stepCompleted">
                  {Object.keys(cart.cartItems)?.length} items
                </div>
              ) : null
            }
          />

          {orderSummary && (
            <Card
              style={{
                margin: "10px 0",
              }}
            >
              <div
                className="flexRow sb"
                style={{
                  padding: "20px",
                  alignItems: "center",
                }}
              >
                <p style={{ fontSize: "12px" }}>
                  Order confirmation email will be sent to{" "}
                  <strong>{auth.user.email}</strong>
                </p>
                <MaterialButton
                  title="CONFIRM ORDER"
                  onClick={() => {
                    userOrderConfirmation();
                    onConfirmOrder();
                  }}
                  style={{
                    width: "200px",
                  }}
                />
              </div>
            </Card>
          )}

          <CheckoutStep
            stepNumber={"4"}
            title={"PAYMENT OPTIONS"}
            active={paymentOption}
            body={
              paymentOption &&
              user.placedOrderId && (
                <div>
                  <div
                    className="d-flex flex-column flex-sm-row"
                    style={{
                      alignItems: "center",
                      padding: "20px",
                      fontSize: "small",
                    }}
                  >
                    <div>Click on the below button to complete Payment</div>
                    <button className="razorpay-btn" onClick={displayRazorpay}>
                      <span>Pay with Razorpay</span>
                      <div className="razorpay-logo">
                        <img src={razorpayLogo} alt="razorpayLogo" />
                      </div>
                    </button>
                  </div>

                  {/* <MaterialButton
                    title="CONFIRM ORDER"
                    onClick={onConfirmOrder}
                    style={{
                      width: "200px",
                      margin: "0 0 20px 20px",
                    }}
                  /> */}
                </div>
              )
            }
          />
        </div>

        {/* Price Component */}
        <PriceDetails
          totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
            return qty + cart.cartItems[key].qty;
          }, 0)}
          totalPrice={Object.keys(cart.cartItems).reduce((totalPrice, key) => {
            const { price, qty } = cart.cartItems[key];
            return totalPrice + price * qty;
          }, 0)}
        />
      </div>
    </Layout>
  );
};

export default CheckoutPage;
