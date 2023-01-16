import { createStore } from "redux";
import reducers from "./Reducers/Index";
const store = createStore(
    reducers, {}, 
);
export default store