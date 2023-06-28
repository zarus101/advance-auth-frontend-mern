import { useSelector } from "react-redux"
import { selectIsLoggedIn, selectUser } from "../../redux/features/auth/authSlice"



//function for showing the component if the user is logged in only
export const ShowOnLogin=({children})=>{
    const isLoggedIn= useSelector(selectIsLoggedIn)

    if(isLoggedIn){
        return <>{children}</>
    }
    return null
}


//funciton for showing the component if the user is not logged in
export const ShowOnLogout=({children})=>{
    const isLoggedIn=  useSelector(selectIsLoggedIn)

    if(!isLoggedIn){
        return <>{children}</>
    }
    return null
}


////fuction for showing the shorttext from the long text
export const shortenText = (text, n) => {
    if (text.length > n) {
      const shoretenedText = text.substring(0, n).concat("...");
      return shoretenedText;
    }
    return text;
  };


////function for the showing the username
export const UserName=()=>{
    const user= useSelector(selectUser)

    const username= user?.fullName || "..." ;
    
    return <p className="bb text-[20px] flex font-bold text-black">{shortenText(username, 20)}</p>

}