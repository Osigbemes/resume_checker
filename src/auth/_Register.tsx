import { Link } from "react-router-dom";
import { Button } from "../partials/Button";
import {useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import {useState } from 'react'
import axios from "axios";
import swal from 'sweetalert'
import { useDispatch, useSelector } from "react-redux";
import {RegisterUser} from "../Redux/Actions/AuthActions";
import Sidebar from "../components/Sidebar"
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      password: '',
    },
    onSubmit: (values: any) => {
    setLoading(!loading);
    console.log(values);
    const registerUser = async (values:any) => {
    const response = await axios
    .post('https://admin-service.huzz.africa/api/v1/auth/register', values)
        .then((response) => {
          setLoading(false);
          console.log(response);
          console.log("Data Loaded", response.data);
          dispatch(RegisterUser(response.data));
          localStorage.setItem("User", JSON.stringify(response.data));
          localStorage.setItem("Token", JSON.stringify(response.data.token));
          console.log(response.data.token)
          swal("Success", "Login Successful", "success");
                //@ts-ignore
           setTimeout(function () { navigate("/dashboard") }, 1000);
        })
        .catch(({err, response}:any) => {
          setLoading(false);
            console.log("Err: ", err);
                swal({
                title: "!Oops.",
                text: response.data.Error,
                icon: "warning",
              });
          });
          };
        registerUser(values);
    },
    // validationSchema: forgotPasswordSchema,
    validateOnChange: false,
  });
  const {Products}:any = useSelector((state) => state);
  const state:any = useSelector((state) => state);
  console.log(Products)
  console.log(state)
  return (
    <div>
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">start your 14-day free trial</a>
            </p>
          </div>
          <form onSubmit={formik.handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">Email address</label>
                <input
                
                    id="phoneNumber"
                    name="phoneNumber"
                    type="text"
                    onChange={formik.handleChange}
                    autoComplete="phoneNumber"
                    required
className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Phone Number" />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input 
                
                
                
                                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    autoComplete="current-password"
                    required

                    
                    
                    
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">Forgot your password?</a>
              </div>
            </div>
            <div>
                                              <Button
                  // onClick={
                  //   handleSubmit()
                  // }
                  loadingText={"Authenticating"}
                  loading={loading}
                  text={"Login"}
                  btnType={"secondary"}
                />

              {/* <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">

  
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                  </svg>
                </span>
                Sign in
              </button> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Register