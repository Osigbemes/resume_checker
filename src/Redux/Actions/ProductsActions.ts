import { ActionTypes } from "../Constants/ActionTypes";


const setProducts = (gigs:any) =>{
    return{
        type: ActionTypes.SET_PRODUCTS,
        payload: gigs
    };
};

export default setProducts;