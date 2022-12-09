import { combineReducers } from "redux";
import productsReducer from "./ProductsReducers";
import AuthReducers from "./AuthReducers";

const reducers = combineReducers({
    Products: productsReducer,
    User: AuthReducers
});  

export default reducers; 