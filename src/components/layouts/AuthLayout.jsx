import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../commons/Navbar";
import { getLoginStatus, getUser, selectIsLoggedIn, selectUser } from "../../redux/features/auth/authSlice";
import { useEffect } from "react";
import NotAuthorized from "../../commons/NotAuthorized";

export const AuthLayout = ({ children }) => {
  const isLoggedIn= useSelector(selectIsLoggedIn)
  const user= useSelector(selectUser)
  const dispatch= useDispatch()
  useEffect(() => {
    dispatch(getLoginStatus());
    if(isLoggedIn && user===null){
      dispatch(getUser())
    }
    console.log(user)
    console.log(isLoggedIn)

  }, [dispatch, isLoggedIn, user])

  console.log(isLoggedIn)
  console.log(user)
  

  if(isLoggedIn){
    return (
      <>
        <Navbar />
        <div>{children}</div>
      </>
    );
  }
  return <NotAuthorized/>

  
};
