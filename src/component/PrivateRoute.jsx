import { Navigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/userContext";

export default function PrivateRoute({allowRoles, children}){
    // console.log(allowRoles);
    const token = localStorage.getItem('token')
    const {user, isLogged} = useContext(UserContext)
    if(token && !isLogged){
        return <p> loading</p> 
    }
    else if(token && allowRoles.includes(user.role)){
        return children;
    } else if(token && !allowRoles.includes(user.role)){
        return <h2> Unauthorized</h2>
    } else{
        return <Navigate to ="/login"/>
    }
}