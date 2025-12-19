import UserContext from "../context/userContext"
import { useReducer, useEffect } from "react"
import axios from "../config/a"
import {Link} from "react-router-dom"
import {  useNavigate } from "react-router-dom"


export default function AuthProvider(props){
    const navigate = useNavigate()

    const usereducer=(state, action)=>{
        switch(action.type){
            case "LOG_IN":{
                return {...state,  isLogged:true, user:action.payload, serverError:""}
            }
            case "LOG_OUT":{
                return {...state, isLogged:false, user:null, serverError:""}
            }
            case "SERVER_ERROR":{
                return {...state, serverError:action.payload}
            }
            default:{
                return {...state}
            }
        }
    }

    const[userState, userDispatch]=useReducer(usereducer, {
        user:null,
        isLogged:false,
        serverError:""
    });


        useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            const fetchUser = async () => {
                try {
                    const response = await axios.get('/users/account',
                      {headers:{Authorization:token}}
                    );
                    userDispatch({type:"LOG_IN", payload:response.data});
                } catch(err){
                    console.log(err);
                }
            };
            fetchUser();
        }
    }, []);

    const handleregister = async(formdata)=>{
            try{
                const response = await axios.post("/users/register", formdata)
                console.log(response.data)
                alert("succefully register")
                userDispatch({type:"SERVER_ERROR", payload:""})
                navigate("/login")
    
            }catch(err){
                // console.log( "register", err.response.data)
                userDispatch({type:"SERVER_ERROR", payload:err.response.data.error})
            }
        }

     const handlelogin = async(values)=>{
        try{
            const response = await axios.post("/users/login", values)
            console.log(response.data)
            localStorage.setItem('token', response.data.token);
            
            const userResponse = await axios.get('/users/account', {headers:{Authorization:localStorage.getItem("token")}})
            const role = userResponse.data.role;
            alert("successfully logged in")
            userDispatch({type:"LOG_IN", payload:userResponse.data})

            if(role == "admin"){
                navigate("/admin/dashboard")
            } else if(role =="brand"){
                navigate("/brand-dashboard")
            } else if(role =="producer"){
                navigate("/producer-dashboard")
            }
            
        }
        catch(err){
            console.log(err)
            //   let errorMsg = "Something went wrong"
            //   if (err.response?.data?.error) {
            //     if (Array.isArray(err.response.data.error)) {
            // errorMsg = err.response.data.error[0].message
            // } else {
            //     errorMsg = err.response.data.error
            // }
            // }
            userDispatch({type:"SERVER_ERROR", payload:errorMsg})
        }
     }   

     const handlelogout = () =>{
        localStorage.removeItem("token")
        userDispatch({type: "LOG_OUT"})
    }
   return (
    <UserContext.Provider value ={{ ...userState, handleregister,handlelogin , handlelogout}}>
        {props.children}
    </UserContext.Provider>  
   )
}