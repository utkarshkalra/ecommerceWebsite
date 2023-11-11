import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import CartItem from "./CartItem";
import { addToCart, getCartItems, removeCartItem } from "../../actions";
import PriceDetails from "../../components/PriceDetails";
import EmptyCart from "./emptyCartSVG";
import "./style.css";

/*
Before Login
Add product to cart
save in localStorage
when try to checkout ask for credentials and 
if logged in then add products to users cart database from localStorage

*/

const CartPage = (props) => {
  const cart = useSelector((state) => state.cart);
  const auth = useSelector((state) => state.auth);
  // const cartItems = cart.cartItems;
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();

  const [emptyCart, setEmptyCart] = useState(false);

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (Object.keys(cartItems)?.length > 0) setEmptyCart(false);
    else setEmptyCart(true);
    console.log("cart items ==========> length ", cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  const onQuantityIncrement = (_id, qty) => {
    //console.log({_id, qty});
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, 1));
  };

  const onQuantityDecrement = (_id, qty) => {
    const { name, price, img } = cartItems[_id];
    dispatch(addToCart({ _id, name, price, img }, -1));
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  if (props.onlyCartItems) {
    return (
      <>
        {Object.keys(cartItems).map((key, index) => (
          <CartItem
            key={index}
            cartItem={cartItems[key]}
            onQuantityInc={onQuantityIncrement}
            onQuantityDec={onQuantityDecrement}
          />
        ))}
      </>
    );
  }

  return (
    <Layout>
      <div
        className="cartContainer d-flex flex-column flex-md-row"
        style={{ alignItems: "flex-start" }}
        key={cartItems?.length}
      >
        <Card
          headerLeft={`My Cart`}
          headerRight={<div>Price</div>}
          style={{ flex: "3", overflow: "scroll", height: "95%" }}
        >
          {emptyCart ? (
            <EmptyCart />
          ) : (
            Object.keys(cartItems).map((key, index) => (
              <CartItem
                key={index}
                cartItem={cartItems[key]}
                onQuantityInc={onQuantityIncrement}
                onQuantityDec={onQuantityDecrement}
                onRemoveCartItem={onRemoveCartItem}
              />
            ))
          )}
        </Card>
        <div
          className="d-flex flex-column w-100 m-md-3 my-3 price-card"
          style={{ flex: "2" }}
        >
          <PriceDetails
            totalItem={Object.keys(cart.cartItems).reduce(function (qty, key) {
              return qty + cart.cartItems[key].qty;
            }, 0)}
            totalPrice={Object.keys(cart.cartItems).reduce(
              (totalPrice, key) => {
                const { price, qty } = cart.cartItems[key];
                return totalPrice + price * qty;
              },
              0
            )}
          />

          <button
            onClick={() =>
              emptyCart
                ? alert("Your cart is empty ")
                : props.history.push(`/checkout`)
            }
            className="w-100 place-order p-2"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
      )
    </Layout>
  );
};

export default CartPage;
