import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./containers/HomePage";
import ProductListPage from "./containers/ProductListPage";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, updateCart } from "./actions";
import ProductDetailsPage from "./containers/ProductDetailsPage";
import CartPage from "./containers/CartPage";
import CheckoutPage from "./containers/CheckoutPage";
import OrderPage from "./containers/OrderPage";
import OrderDetailsPage from "./containers/OrderDetailsPage";
import AllProducts from "./containers/ProductListPage/AllProducts/index.allproducts";
import PhotoGallery from "./components/PhotoGallery/index.photogallery";
import ContactPage from "./containers/ContactPage/ContactPage";
import About from "./containers/About";
import Cart from "./components/UI/Cart";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    console.log("App.js - updateCart");
    if (auth.authenticate) dispatch(updateCart());
  }, [auth.authenticate]);

  const cart = useSelector((state) => state.cart);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/photo-gallery" component={PhotoGallery} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/about" component={About} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/products/:slug" component={AllProducts} />
          <Route path="/account/orders" component={OrderPage} />
          <Route path="/order_details/:orderId" component={OrderDetailsPage} />
          <Route
            path="/:productSlug/:productId/p"
            component={ProductDetailsPage}
          />
          <Route path="/:slug" component={ProductListPage} />
        </Switch>
      </Router>
      <div>
        <a href={`/cart`} className="cart">
          <Cart count={Object.keys(cart.cartItems)?.length} />
        </a>
      </div>
    </div>
  );
}

export default App;
