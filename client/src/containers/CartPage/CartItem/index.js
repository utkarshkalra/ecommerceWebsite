import React, { useState, useEffect } from "react";
import "./style.css";
import { AiFillDelete } from "react-icons/ai";
import i1 from "../../../images/2.jpg";
const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.qty);

  const { _id, name, price, img } = props.cartItem;

  const onQuantityIncrement = () => {
    setQty(qty + 1);
    props.onQuantityInc(_id, qty + 1);
  };

  const onQuantityDecrement = () => {
    if (qty <= 1) return;
    setQty(qty - 1);
    props.onQuantityDec(_id, qty - 1);
  };

  useEffect(() => {
    console.log("propsie", props);
  }, []);

  return (
    <div className="cartItemContainer container ">
      <div className="flexRow responsive-cart">
        <div className="cartProImgContainer">
          <img src={img} alt={"product image"} />
        </div>

        <div className="w-100">
          <div className="w-100 h-100 cartItemDetails ">
            <div>
              <h5>{name}</h5>

              <div className="quantityControl">
                <button onClick={onQuantityDecrement}>-</button>
                <input value={qty} readOnly />
                <button onClick={onQuantityIncrement}>+</button>
              </div>
            </div>

            <div className="price-cart ">
              <div className="d-flex ">
                <p>Rs. {price}</p> <span>{price + 50}</span>
              </div>

              <button
                className="cartActionBtn w-100"
                onClick={() => props.onRemoveCartItem(_id)}
              >
                Delete <AiFillDelete />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
