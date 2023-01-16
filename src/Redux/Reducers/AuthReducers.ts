import { ActionTypes } from "../Constants/ActionTypes";


const initialState = {

    User: [


    ],

};

const AuthReducers = (state = initialState, { type, payload }:any) => {
    switch (type) {

    case ActionTypes.LOGIN_USER:
        return {...state, User:payload };

    default:
        return state
    }
}


export default AuthReducers;



