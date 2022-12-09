import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
// import { showToast } from "../dashboard/partials/Toaster"
import { useSelector } from "react-redux";
import swal from 'sweetalert'
import Sidebar from "../components/Sidebar"
import Footer from '../components/Footer';

export const AuthLayout = ({ children }: any) => {
    const {Products, User}:any = useSelector((state) => state);
    // let LoggedIn:any = false;
    // LoggedIn = localStorage.getItem("User")
    // console.log(LoggedIn)
    // console.log(User.User, typeof User);
    // const navigate = useNavigate();
    // useEffect(() => {
    //     if (!LoggedIn) {
    //         const message = "You need to login to see this route";
    //         swal({
    //             title: "!Oops.",
    //             text: message,
    //             icon: "warning",
    //           });            
    //           navigate("/login");
    //     }
        
    // }, [navigate]);
    return (
        <div className="auth-layout">
            <div className="nav-box">
                {/* <Navbar /> */}
            </div>
            <div className="cont-box">
              <Sidebar/>
              <div className="md:ml-64">
                {children}
                        <Footer/>

                </div>
            </div>
        </div>
    )
}
export const LoggedInLayout = ({ children }: any) => {
    const navigate = useNavigate();
    let LoggedIn = localStorage.getItem("User")
    console.log(LoggedIn)
    useEffect(() => {
        if (LoggedIn) {
            const message = "You are already logged in";
            swal({
                title: "Yay.",
                text: message,
                icon: "success",
              });
            // navigate("/dashboard");
        }else {

        }
    }, [navigate]);
    return (
        <div className="auth-layout">
            <div className="nav-box">
                {/* <Navbar /> */}
            </div>
            <div className="cont-box">
                {children}
            </div>
        </div>
    )
}
