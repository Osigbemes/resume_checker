import { ActionTypes } from "../Constants/ActionTypes";

export const RegisterUser = (payload:any) =>{
    return{
        type: ActionTypes.LOGIN_USER,
        payload: payload
    };
};

