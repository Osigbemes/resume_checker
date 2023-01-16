import { BrowserRouter, Routes, Route } from "react-router-dom";
import { publicRoutes, privateRoutes, authRoutes } from "./routers";
import { AuthLayout, LoggedInLayout } from "./utility/AuthLayout";

import { useState, useEffect } from "react";
import './css/App.css';
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles
// Tailwind CSS Style Sheet

// import { useNavigate } from "react-router-dom";
// import { showToast } from "../dashboard/partials/Toaster"
import { useSelector } from "react-redux";
import swal from 'sweetalert';
import Footer from './components/Footer';
import { useNavigate } from "react-router-dom";
import AppNotification from "./utility/Notfication";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();
function App() {
    const navigate = useNavigate();
    let paramString = window.location.pathname;
    useEffect(() => {
      AOS.init({
        offset: 200,
        duration: 300,
        easing: 'ease-in-sine',
        delay: 100,
      });
    })
  let LoggedIn: any = false;
  LoggedIn = localStorage.getItem("User")
  useEffect(() => {
    if (!LoggedIn && (paramString != "/login")){
      const message = "You are not logged in";
      AppNotification("Oops", "error", 'topRight', message)
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {publicRoutes.map((route: any, index: any) => (
            <Route
              key={index}
              path={route.route}
              element={<route.component />}
            />
          ))}
          {privateRoutes.map((route: any, index: any) => (
            <>
              <Route
                key={index}
                path={route.route}
                element={
                  <AuthLayout >
                    <route.component />
                  </AuthLayout >
                }
              />
            </>
          ))}
          {authRoutes.map((route: any, index: any) => (
            <Route
              key={index}
              path={route.route}
              element={
                <LoggedInLayout >
                  <route.component />
                </LoggedInLayout >
              }
            />
          ))}
        </Routes>
      </QueryClientProvider>
    </div>
  );
}
export default App;
