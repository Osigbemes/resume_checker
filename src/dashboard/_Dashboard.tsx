import { Link } from "react-router-dom";
import { Button } from "../partials/Button";
import { useNavigate } from "react-router-dom";
import { useState } from 'react'
import { useEffect } from "react";
import axios from "axios";
import swal from 'sweetalert'
import { useDispatch, useSelector } from "react-redux";
import setProducts from "../Redux/Actions/ProductsActions";

function Dashboard() {
  const [productPage, setProductsPage] = useState(4)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchProducts = async () => {
    const response = await axios
      .get("https://www.giropay.xyz/api/v1/giro-app/products")
      .then(response => {
        console.log("Data Loaded", response.data);
        dispatch(setProducts(response.data));
        // swal("Great", "All Products Were Fetched Successfully", "success");
      })
      .catch((err) => {
        console.log("Err: ", err);
        swal({
          title: "!Oops.",
          text: "An Error Occured While Loading Data. Reload Page",
          icon: "warning",
        });
      });
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const { Products, User }: any = useSelector((state) => state);
  const state: any = useSelector((state) => state);
  console.log(state);
  let { data } = Products.Products;
  if (data == null) {
    data = []
  }
  const slicedProduct = data.slice(0, productPage)
  const getUserFromLocalStorage = () => {
    try {
      return JSON.parse(localStorage.getItem("User") || '');
    } catch (error) {
      return null;
    }
  };
  let UserData = getUserFromLocalStorage()
  return (
    <div>
      <div>
        <section className="bg-blue-900 py-10">
          <div className="md:grid grid-cols-4 gap-0 md:flex-wrap text-left md:text-left allign-left overflow-hidden mx-16">
            <div className="md:col-span-1 mt-10  text-center overflow-hidden">
              <Link to={"/"}>    <img
                className="h-10 w-auto"
                src="./img/rodufy.svg"
                alt="Workflow"
              /> </Link>
            </div>
            <div className="md:col-span-1 mt-10  hidden md:block  text-center overflow-hidden">
            </div>
            <div className="md:col-span-1 mt-10   hidden md:block text-center overflow-hidden">
            </div>
            <div className="md:col-span-1 mt-10 text-center overflow-hidden">
              <h1 className="text-3xl font-semibold mt-10 md:mt-0 text-white leading-normal">{UserData ? UserData?.profile?.name : "User Name"}</h1>
            </div>
          </div>
          <div className="md:grid grid-cols-4 gap-0 md:flex-wrap text-left md:text-left allign-left overflow-hidden mx-16">
            <div className="md:col-span-1 mt-10 hidden md:block text-center overflow-hidden">
            </div>
            <div className="md:col-span-1 mt-10 hidden md:block text-center overflow-hidden">
            </div>
            <div className="md:col-span-1 mt-10 hidden md:block text-center overflow-hidden">
            </div>
          </div>
        </section>
        <section className="bg-gray-900 py-10">
          <div className="md:grid grid-cols-1 gap-0 md:flex-wrap text-center md:text-left allign-center overflow-hidden md:mx-16 mx-6">
            <div className="">
            </div>
          </div>
        </section>
        <section className="bg-gray-900 py-10">
          <div className="mx-16">
            <img
              className="w-5 inline mr-2"
              src="./img/up.svg"
              alt="Workflow"
            />
            <h2 className=" inline text-xl leading-8 font-semibold mb-12 text-slate-700">
              Trending
            </h2>
          </div>
          <div className="md:grid grid-cols-2 gap-0 md:flex-wrap text-center md:text-left allign-center overflow-hidden md:mx-16 mx-6">
          </div>
        </section>
      </div>
    </div>
  )
}
export default Dashboard;