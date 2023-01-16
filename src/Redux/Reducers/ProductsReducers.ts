import { ActionTypes } from "../Constants/ActionTypes";


const initialState = {

    Products: [


    ],

};

const productsReducer = (state = initialState, { type, payload }:any) => {
    switch (type) {

    case ActionTypes.SET_PRODUCTS:
        return {...state, Products:payload };

    default:
        return state
    }
}


export default productsReducer;



