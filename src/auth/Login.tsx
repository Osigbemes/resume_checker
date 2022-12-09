import { Link } from "react-router-dom";
import { Button } from "../partials/Button";
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import axios from "axios";
import swal from 'sweetalert'
import { useDispatch, useSelector } from "react-redux";
import { RegisterUser } from "../Redux/Actions/AuthActions";
import Sidebar from "../components/Sidebar";
import { Divider, notification, Space } from 'antd';
import { Api } from "../apis/Api";
import { fetchData, postData } from '../services/Actions';
import { useQuery } from "react-query";
import AppNotification from "../utility/Notfication";
function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 200,
      searchValue: "",
      selectedValue: "",
      from: "",
      to: "",
    },
    searchParams: {
      searchValue: "femmydhayor@gmail.com",
      selectedValue: "email",
    },
  });


  // api Call
  // const { data: responseData, isLoading: status, isError, } = useQuery(
  //   ["fetchDebtors", tableParams?.pagination, "/admin/business/debtor"],
  //   fetchData, {
  //   onError: (err) => {
  //     alert(err);
  //   },
  // },
  //   //@ts-ignore
  //   {
  //     keepPreviousData: true,
  //   }
  // );

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      password: '',
    },
    onSubmit: (values: any) => {
      setLoading(!loading);

    //   const queryParam = [
    //       "fetchUsers",
    //       tableParams?.pagination,
    //       "/auth/login",
    //       values
    //   ]
    //  console.log(postData(queryParam));

      const loginUser = async (values: any) => {
        const response = await Api()
          .post(`https://admin-service.huzz.africa/api/v1/auth/login`, values)
          .then((response: any) => {
            setLoading(false);
            dispatch(RegisterUser(response.data));
            localStorage.setItem("User", JSON.stringify(response.data.user));
            localStorage.setItem("Token", JSON.stringify(response.data.accessToken));
            localStorage.setItem("Profile", JSON.stringify(response.data.profile));
            localStorage.setItem("TokenType", JSON.stringify(response.data.tokenType));
            AppNotification("Success", "success", 'topRight', "You are logged in")
            //@ts-ignore
            setTimeout(function () { navigate("/") }, 1000);
          })
          .catch(({ err, response }: any) => {
            setLoading(false);
            console.log("Err: ", err);
            AppNotification("Oops", "error", 'topRight', response?.data?.message)
            swal("Error", response, "error");
          });
      };
      loginUser(values);
    },
    validateOnChange: false,
  });

  // const {Products}:any = useSelector((state) => state);
  // const state:any = useSelector((state) => state);
  // console.log(Products)
  // console.log(state)

  return (
    <div>
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img className="mb-20 mx-auto h-12 w-auto" src="https://huzz.africa/assets/img/icons/huzz-logo.svg" alt="Your Company" />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to Huzz Admin</h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              <a href="#" className="font-medium text-huzz-green hover:text-indigo-500">...</a>
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
                <a href="#" className="font-medium text-huzz-green hover:text-indigo-500">Forgot your password?</a>
              </div>
            </div>
            <div>
              <Button
                loadingText={"Authenticating"}
                loading={loading}
                text={"Login"}
                btnType={"secondary"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Register