import categoryReducer from "./category.reducer";
import productReducer from "./product.reducer";
import authReducer from "./auth.reducer";
import cartReducer from "./cart.reducer";
import userReducer from "./user.reducer";
import categoryUserReducer from "./categoryuser.reducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  category: categoryReducer,
  categoryUser: categoryUserReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  user: userReducer,
});

export default rootReducer;
