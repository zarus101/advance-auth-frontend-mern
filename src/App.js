import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { AuthLayout } from "./components/layouts/AuthLayout";
import Home from "./pages/home/home";
import { NoAuthLayout } from "./components/layouts/NoAuthLayout";
import Login from "./pages/authentications/login";
import Register from "./pages/authentications/register";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ForgetPassword from "./pages/authentications/forgetPassword";
import ResetPassword from "./pages/authentications/resetPassword";
import LoginWithCode from "./pages/authentications/loginWithCode";
import VerifyUser from "./pages/authentications/verifyUser";
import Profile from "./pages/profile/profile";
import { useDispatch, useSelector } from "react-redux";
import { getLoginStatus, getUser, selectIsLoggedIn, selectUser } from "./redux/features/auth/authSlice";
import { GoogleOAuthProvider } from "@react-oauth/google";
import axios from "axios";
import { GOOGLE_CLIENT_ID } from "./redux/services/helper";

axios.defaults.withCredentials = true;

function App() {
  const dispatch= useDispatch();
  const isLoggedIn= useSelector(selectIsLoggedIn);
  const user= useSelector(selectUser)

  useEffect(() => {
    dispatch(getLoginStatus());
    if(isLoggedIn && user===null){
      dispatch(getUser())
    }
    console.log(user)
    console.log(isLoggedIn)

  }, [dispatch, isLoggedIn, user])
  


  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>

        <Routes>
          <Route
            path="/"
            element={
              <NoAuthLayout>
                <Home />
              </NoAuthLayout>
            }
          />
          {/* route for the login page */}
          <Route
            path="/login"
            element={
              <NoAuthLayout>
                <Login />
              </NoAuthLayout>
            }
          />

          {/* route for the register page */}
          <Route
            path="/register"
            element={
              <NoAuthLayout>
                <Register />
              </NoAuthLayout>
            }
          />

          {/* route for the register page */}
          <Route
            path="/forgetpassword"
            element={
              <NoAuthLayout>
                <ForgetPassword />
              </NoAuthLayout>
            }
          />

          {/* //route for the resetting the password */}
          <Route
            path="/resetPassword/:resetToken"
            element={
              <NoAuthLayout>
                <ResetPassword />
              </NoAuthLayout>
            }
          />

          {/* //route for the logging with code  */}
          <Route
            path="/loginwithcode/:email"
            element={
              <NoAuthLayout>
                <LoginWithCode />
              </NoAuthLayout>
            }
          />

          {/* ///route for verifying the user */}
          <Route
            path="/verify/:verificationToken"
            element={
              <NoAuthLayout>
                <VerifyUser />
              </NoAuthLayout>
            }
          />

          {/* /route for profile  */}
          <Route
            path="/profile"
            element={
              <AuthLayout>
                <Profile />
              </AuthLayout>
            }
          />
        </Routes>
        </GoogleOAuthProvider>

      </BrowserRouter>
    </>
  );
}

export default App;
