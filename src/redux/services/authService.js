import axios from "axios";
import { BACKEND_URL } from "./helper";


export const API_URL = `${BACKEND_URL}/v1/users/`;

////function for validating the email
export const validateEmail = (email) => {
  return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

////register theuser
const register = async (userData) => {
  const response = await axios.post( `${API_URL}register`, userData, {
    withCredentials: true,
  });
  return response.data;
};

///logging the user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);
  return response.data;
};

////log out user
const logout = async () => {
  const response = await axios.get(API_URL + "logout", {
    withCredentials: true,
  });
  return response.data;
};

///getting the login status
const getLoginStatus = async () => {
  const response = await axios.get(API_URL + "loginstatus", {
    withCredentials: true,
  });
  return response.data;
};

///gertting the user profile
const getUser = async () => {
  const response = await axios.get(API_URL + "getuser", {
    withCredentials: true,
  });
  return response.data;
};

/////getting the verification email
const sendVerificationEmail = async () => {
  const response = axios.post(API_URL + "sendVerificationEmail",null, {
    withCredentials: true,
  });
  return response.data;
};

////verifying the user
const verifyUser = async (verificationToken) => {
  const response = await axios.patch(`${API_URL}verifyuser/${verificationToken}`,null, {
    withCredentials: true,
  });
  return response.data.message;
};

////resetting the password
const resetPassword = async (userData, resetToken) => {
  const response = await axios.patch(`${API_URL}resetpassword/${resetToken}`, userData);
  return response.data.message;
};

////forget opassword
const forgotPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgetPassword", userData);
  return response.data.message;
};

///sending the login code
const sendLoginCode = async (email) => {
  const response = await axios.post(API_URL + `sendlogincode/${email}`);
  return response.data.message;
};

////loging eith the code
const loginWithCode = async (email, data) => {
  const response = await axios.post(`${API_URL}loginwithcode/${email}`, data, {
    withCredentials: true
  });
  return response.data;
};

/////logging with google
const loginWithGoogle= async(data)=>{
  const response= await axios.post(`${API_URL}google/callback`, data, {
    withCredentials: true
  })


  return response.data
  
}


/////exporting the serverces
const authService = {
  register,
  login,
  logout,
  sendVerificationEmail,
  verifyUser,
  sendLoginCode,
  loginWithCode,
  getUser,
  getLoginStatus,
  forgotPassword,
  resetPassword,
  loginWithGoogle
};

export default authService;
