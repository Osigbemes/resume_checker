import { useNavigate } from "react-router-dom";
const axios = require("axios");
const baseURL = process.env.REACT_APP_API_BASE_URL;
export const Api = () => {
    // @ts-ignore
    let token = JSON.parse(localStorage.getItem("Token"));
    if (token) 
    { 
        token = token.split('"').join('') ;
        token = `Bearer ${token}`;
    } 
    return axios.create({
        baseURL,
        headers: { Authorization: token }
    });
}
export const apiUrl = baseURL;
